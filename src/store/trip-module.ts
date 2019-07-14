import { cloneDeep, isEmpty, map, remove, sortBy } from 'lodash';
import * as moment from 'moment-timezone';
import { ActionContext, ActionTree, Module, MutationTree } from 'vuex';

import { RootState, TripState } from './types';
import { Event } from '../models/event';
import { Trip } from '../models/trip';
import { TripDay } from '../models/trip-day';
import { EventService } from '../services/event-service';
import { TripService } from '../services/trip-service';
import { DATE_FORMAT, DATE_TIME_FORMAT, DATE_TIME_TZ_FORMAT } from '../constants/general';
import { Actions } from '../constants/actions';
import { Messages } from '../constants/messages';
import { timezone } from '../assets/timezone';

const tripList: Trip[] = [];
const trip_day: TripDay[] = [];
const state: TripState = {
  isLoading: false,
  tripList,
  tripDetail: {
    id: 0,
    timezone_id: 0,
    start_date: '',
    end_date: '',
    name: '',
    destination: '',
    archived: false,
    trip_day,
  },
};
const namespaced = true;
const eventService = new EventService();
const tripService = new TripService();

const _dispatchCreateAlert = (dispatch: ActionContext<TripState, RootState>['dispatch'], message: string) => {
  dispatch(Actions.CREATE_ALERT, { type: 'error', message: message ? message : 'Error!' }, { root: true });
};

const _generateGetTripListPayload = (currentMenu: 'archived' | 'current' | 'upcoming' | 'past') => {
  let requestBody = null;
  if (currentMenu === 'archived') {
    requestBody = {
      archived: true,
    };
  } else if (currentMenu === 'current') {
    requestBody = {
      start_date: moment().format(DATE_FORMAT),
      end_date: moment().format(DATE_FORMAT),
      archived: false,
    };
  } else if (currentMenu === 'upcoming') {
    requestBody = {
      start_date: moment().format(DATE_FORMAT),
      archived: false,
    };
  } else if (currentMenu === 'past') {
    requestBody = {
      end_date: moment().format(DATE_FORMAT),
      archived: false,
    };
  } else {
    requestBody = {
      archived: false,
    };
  }
  return requestBody;
};

const _createTripRequestPayload = (payload: Trip): Trip => {
  let newPayload = cloneDeep(payload);
  // Convert to string before sending to server
  newPayload.start_date = moment(payload.start_date_object).format(DATE_FORMAT);
  newPayload.end_date = moment(payload.end_date_object).format(DATE_FORMAT);
  // Must delete start_time_object and end_time_object before sending request to server since these 2 objects are only for UI
  delete newPayload.start_date_object;
  delete newPayload.end_date_object;

  return newPayload;
};

const _createEventRequestPayload = (payload: Event, state: TripState): Event => {
  let newPayload = cloneDeep(payload);
  Object.keys(newPayload).forEach(prop => {
    // Convert to UTC date time string before sending request to server
    if (prop === 'start_time_object') {
      if (newPayload.start_time_object) {
        newPayload.start_time_timezone_id = newPayload.start_time_timezone_id
          ? newPayload.start_time_timezone_id
          : state.tripDetail.timezone_id;
        const startTimeTimezone = timezone.find(tz => tz.id === newPayload.start_time_timezone_id);
        newPayload.start_time = moment
          .tz(moment(newPayload.start_time_object).format(DATE_TIME_FORMAT), startTimeTimezone.utc)
          .utc()
          .format(DATE_TIME_FORMAT);
      } else {
        newPayload.start_time = null;
      }
    } else if (prop === 'end_time_object') {
      if (newPayload.end_time_object) {
        newPayload.end_time_timezone_id = newPayload.end_time_timezone_id
          ? newPayload.end_time_timezone_id
          : state.tripDetail.timezone_id;
        const endTimeTimezone = timezone.find(tz => tz.id === newPayload.end_time_timezone_id);
        newPayload.end_time = moment
          .tz(moment(newPayload.end_time_object).format(DATE_TIME_FORMAT), endTimeTimezone.utc)
          .utc()
          .format(DATE_TIME_FORMAT);
      } else {
        newPayload.end_time = null;
      }
    } else if (prop === 'currency_id' && newPayload.currency_id === 0) {
      newPayload.currency_id = null;
    } else if (prop === 'start_time_timezone_id' && newPayload.start_time_timezone_id === 0) {
      newPayload.start_time_timezone_id = null;
    } else if (prop === 'end_time_timezone_id' && newPayload.end_time_timezone_id === 0) {
      newPayload.end_time_timezone_id = null;
    } else if (prop === 'cost' && isEmpty(newPayload.cost)) {
      newPayload.cost = null;
    } else if (prop === 'category_id') {
      newPayload.category_id = Number(newPayload[prop]);
    }
  });
  // Must delete start_time_object and end_time_object before sending request to server since these 2 objects are only for UI
  delete newPayload.start_time_object;
  delete newPayload.end_time_object;

  return newPayload;
};

const _parseToLocalTime = (tripEvent: Event, state: TripState): Event => {
  // Convert UTC time to local time for UI displaying
  if (!isEmpty(tripEvent.start_time)) {
    const startTimeTimezoneId = tripEvent.start_time_timezone_id
      ? tripEvent.start_time_timezone_id
      : state.tripDetail.timezone_id;
    const startTimeTimezone = timezone.find(tz => tz.id === startTimeTimezoneId);
    tripEvent.start_time = moment
      .utc(tripEvent.start_time)
      .tz(startTimeTimezone.utc)
      .format(DATE_TIME_TZ_FORMAT);
  }
  if (!isEmpty(tripEvent.end_time)) {
    const endTimeTimezoneId = tripEvent.end_time_timezone_id
      ? tripEvent.end_time_timezone_id
      : state.tripDetail.timezone_id;
    const endTimeTimezone = timezone.find(tz => tz.id === endTimeTimezoneId);
    tripEvent.end_time = moment
      .utc(tripEvent.end_time)
      .tz(endTimeTimezone.utc)
      .format(DATE_TIME_TZ_FORMAT);
  }
  return tripEvent;
};
const actions: ActionTree<TripState, RootState> = {
  isLoading({ dispatch, commit }: ActionContext<TripState, RootState>, payload: boolean) {
    dispatch(Actions.CLEAR_ALERT, null, { root: true });
    commit('isLoading', payload);
  },

  getTripList({ dispatch, commit, rootState }: ActionContext<TripState, RootState>) {
    commit('isLoading', true);
    const requestPayload = _generateGetTripListPayload(rootState.dashboard.currentMenu);
    tripService
      .getTripList(requestPayload)
      .then((result: { success: boolean; result: Trip[] }) => {
        commit('isLoading', false);
        if (result.success) {
          commit('getTripList', result.result);
        } else {
          _dispatchCreateAlert(dispatch, Messages.response.message);
        }
      })
      .catch((error: any) => {
        commit('isLoading', false);
        _dispatchCreateAlert(dispatch, error.error);
      });
  },

  getTripDetail({ dispatch, commit }: ActionContext<TripState, RootState>, tripId: number) {
    commit('isLoading', true);
    tripService
      .getTripDetail(tripId)
      .then((tripDetailResult: { success: boolean; result: Trip }) => {
        commit('isLoading', false);
        if (tripDetailResult.success) {
          commit('getTripDetail', tripDetailResult.result);
          let tripDayId = 0;
          if (!isEmpty(tripDetailResult.result.trip_day)) {
            tripDayId = tripDetailResult.result.trip_day[0].id;
          }
          dispatch(Actions.UPDATE_SELECTED_TRIP_DAY_ID, tripDayId, {
            root: true,
          });
        } else {
          _dispatchCreateAlert(dispatch, Messages.response.message);
        }
      })
      .catch((error: any) => {
        commit('isLoading', false);
        _dispatchCreateAlert(dispatch, error.error);
      });
  },

  createTrip({ dispatch, commit }: ActionContext<TripState, RootState>, payload: Trip) {
    commit('isLoading', true);
    const newPayload = _createTripRequestPayload(payload);
    tripService
      .createTrip(newPayload)
      .then((result: any) => {
        commit('isLoading', false);
        if (result.success) {
          newPayload.id = result.result.trip_id;
          commit('createTrip', newPayload);
        } else {
          _dispatchCreateAlert(dispatch, Messages.response.message);
        }
      })
      .catch((error: any) => {
        commit('isLoading', false);
        _dispatchCreateAlert(dispatch, error.error);
      });
  },

  createTripDay({ dispatch, commit }: ActionContext<TripState, RootState>, payload: TripDay) {
    let newPayload = cloneDeep(payload);
    commit('isLoading', true);
    newPayload.trip_date = moment(payload.trip_date_object).format(DATE_FORMAT);
    delete newPayload.trip_date_object;

    tripService
      .createTripDay(newPayload)
      .then((result: any) => {
        commit('isLoading', false);
        if (result.success) {
          newPayload.id = result.result.trip_day_id;
          commit('createTripDay', newPayload);
        } else {
          _dispatchCreateAlert(dispatch, Messages.response.message);
        }
      })
      .catch((error: any) => {
        commit('isLoading', false);
        _dispatchCreateAlert(dispatch, error.error);
      });
  },

  createTripEvent({ dispatch, commit, state }: ActionContext<TripState, RootState>, payload: Event) {
    commit('isLoading', true);
    const newPayload = _createEventRequestPayload(payload, state);
    eventService
      .createTripEvent(newPayload)
      .then((result: any) => {
        commit('isLoading', false);
        if (result.success) {
          newPayload.id = result.result.event_id;
          commit('createTripEvent', newPayload);
        } else {
          _dispatchCreateAlert(dispatch, Messages.response.message);
        }
      })
      .catch((error: any) => {
        commit('isLoading', false);
        _dispatchCreateAlert(dispatch, error.error);
      });
  },

  updateTrip({ dispatch, commit }: ActionContext<TripState, RootState>, payload: Trip) {
    commit('isLoading', true);
    const newPayload = _createTripRequestPayload(payload);
    tripService
      .updateTrip(newPayload)
      .then((result: any) => {
        commit('isLoading', false);
        if (result.success) {
          commit('updateTrip', newPayload);
        } else {
          _dispatchCreateAlert(dispatch, Messages.response.message);
        }
      })
      .catch((error: any) => {
        commit('isLoading', false);
        _dispatchCreateAlert(dispatch, error.error);
      });
  },

  updateTripEvent({ dispatch, commit, state }: ActionContext<TripState, RootState>, payload: Event) {
    commit('isLoading', true);
    const newPayload = _createEventRequestPayload(payload, state);
    eventService
      .updateTripEvent(newPayload)
      .then((result: any) => {
        commit('isLoading', false);
        if (result.success) {
          commit('updateTripEvent', newPayload);
        } else {
          _dispatchCreateAlert(dispatch, Messages.response.message);
        }
      })
      .catch((error: any) => {
        commit('isLoading', false);
        _dispatchCreateAlert(dispatch, error.error);
      });
  },

  deleteTripEvent({ dispatch, commit, rootState }: ActionContext<TripState, RootState>, payload: Event) {
    commit('isLoading', true);
    eventService
      .deleteTripEvent(payload.id)
      .then((result: any) => {
        commit('isLoading', false);
        if (result.success) {
          commit('deleteTripEvent', payload);
        } else {
          _dispatchCreateAlert(dispatch, Messages.response.message);
        }
      })
      .catch((error: any) => {
        commit('isLoading', false);
        _dispatchCreateAlert(dispatch, error.error);
      });
  },
};

const mutations: MutationTree<TripState> = {
  isLoading(state: TripState, payload: boolean) {
    state.isLoading = payload;
  },

  getTripList(state: TripState, payload: Trip[]) {
    map(payload, (trip: Trip) => {
      trip.start_date = moment(trip.start_date).format(DATE_FORMAT);
      trip.end_date = moment(trip.end_date).format(DATE_FORMAT);
      return trip;
    });
    state.tripList = payload;
  },

  getTripDetail(state: TripState, payload: Trip) {
    if (payload) {
      payload.start_date = moment(payload.start_date).format(DATE_FORMAT);
      payload.end_date = moment(payload.end_date).format(DATE_FORMAT);
      if (!isEmpty(payload.trip_day)) {
        map(payload.trip_day, (tripDay: TripDay) => {
          tripDay.trip_date = moment(tripDay.trip_date).format(DATE_FORMAT);
          map(tripDay.events, (tripEvent: Event) => {
            return _parseToLocalTime(tripEvent, state);
          });
          return tripDay;
        });
      }
      payload.archived = payload.archived === 1;
    }
    state.tripDetail = payload;
  },

  createTrip(state: TripState, payload: Trip) {
    payload.trip_day = [];
    state.tripList.push(payload);
    state.tripList = sortBy(state.tripList, (trip: Trip) => trip.start_date);
  },

  createTripDay(state: TripState, payload: TripDay) {
    payload.events = [];
    state.tripDetail.trip_day.push(payload);
    state.tripDetail.trip_day = sortBy(state.tripDetail.trip_day, (tripDay: TripDay) => tripDay.trip_date);
  },

  createTripEvent(state: TripState, payload: Event) {
    payload = _parseToLocalTime(payload, state);
    map(state.tripDetail.trip_day, (tripDay: TripDay) => {
      if (tripDay.id === payload.trip_day_id) {
        tripDay.events.push(payload);
        tripDay.events = sortBy(tripDay.events, (tripEvent: Event) => tripEvent.start_time);
      }
      return tripDay;
    });
  },

  updateTrip(state: TripState, payload: Trip) {
    // Update trip detail state
    Object.keys(payload).forEach(prop => {
      state.tripDetail[prop] = payload[prop];
    });
    // Update trip list state
    map(state.tripList, (trip: Trip) => {
      if (trip.id === payload.id) {
        Object.keys(payload).forEach(prop => {
          trip[prop] = payload[prop];
        });
      }
      return trip;
    });
  },

  updateTripEvent(state: TripState, payload: Event) {
    payload = _parseToLocalTime(payload, state);
    map(state.tripDetail.trip_day, (tripDay: TripDay) => {
      if (tripDay.id === payload.trip_day_id) {
        map(tripDay.events, (tripEvent: Event) => {
          if (tripEvent.id === payload.id) {
            Object.keys(payload).forEach(prop => {
              tripEvent[prop] = payload[prop];
            });
          }
          return tripEvent;
        });
      }
      return tripDay;
    });
  },

  deleteTripEvent(state: TripState, payload: Event) {
    map(state.tripDetail.trip_day, (tripDay: TripDay) => {
      if (tripDay.id === payload.trip_day_id) {
        remove(tripDay.events, tripEvent => tripEvent.id === payload.id);
      }
      return tripDay;
    });
  },
};

export const trip: Module<TripState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};
