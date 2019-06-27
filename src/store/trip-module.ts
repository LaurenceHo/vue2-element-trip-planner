import { isEmpty, isNumber, map } from 'lodash';
import * as moment from 'moment';
import { ActionTree, Module, MutationTree } from 'vuex';

import { RootState, TripState } from './types';
import { Event } from '../models/event';
import { Trip } from '../models/trip';
import { TripDay } from '../models/trip-day';
import { TripService } from '../services/trip-service';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../constants/general';
import { Actions } from '../constants/actions';

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
const tripService = new TripService();

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

const _createEventRequestPayload = (payload: Event) => {
  let newPayload: Event = {
    trip_day_id: 0,
    category_id: 0,
    timezone_id: 0,
    title: '',
  };
  Object.keys(payload).forEach(prop => {
    // FIXME
    if (prop === 'start_location' || prop === 'end_location' || prop === 'note' || prop === 'cost') {
      // @ts-ignore
      newPayload[prop] = payload[prop];
    } else {
      if ((isNumber(payload[prop]) && payload[prop] > 0) || !isEmpty(payload[prop])) {
        newPayload[prop] = payload[prop];
      }
    }
  });
  return newPayload;
};

const actions: ActionTree<TripState, RootState> = {
  isLoading(context: any, payload: boolean) {
    context.dispatch(Actions.CLEAR_ALERT, null, { root: true });
    context.commit('isLoading', payload);
  },
  getTripList(context: any) {
    context.commit('isLoading', true);
    const requestPayload = _generateGetTripListPayload(context.rootState.dashboard.currentMenu);
    tripService
      .getTripList(requestPayload)
      .then((result: any) => {
        context.commit('isLoading', false);
        if (result.success) {
          context.commit('getTripList', result.result);
        } else {
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  getTripDetail(context: any, tripId: number) {
    context.commit('isLoading', true);
    tripService
      .getTripDetail(tripId)
      .then((result: any) => {
        context.commit('isLoading', false);
        if (result.success) {
          context.commit('getTripDetail', result.result);
          if (context.rootState.dashboard.selectedTripDayId === 0) {
            context.dispatch(Actions.UPDATE_SELECTED_TRIP_DAY_ID, result.result.trip_day[0].id, { root: true });
          }
        } else {
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  createTrip(context: any, payload: Trip) {
    context.commit('isLoading', true);
    if (isEmpty(payload.name)) {
      delete payload.name;
    }
    payload.start_date = moment(payload.start_date).format(DATE_FORMAT);
    payload.end_date = moment(payload.end_date).format(DATE_FORMAT);
    tripService
      .createTrip(payload)
      .then((result: any) => {
        if (result.success) {
          context.dispatch(Actions.GET_TRIP_LIST, null, { root: true });
        } else {
          context.commit('isLoading', false);
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  createTripDay(context: any, payload: TripDay) {
    context.commit('isLoading', true);
    payload.trip_date = moment(payload.trip_date).format(DATE_FORMAT);
    tripService
      .createTripDay(payload)
      .then((result: any) => {
        if (result.success) {
          context.dispatch(Actions.GET_TRIP_DETAIL, payload.trip_id, { root: true });
        } else {
          context.commit('isLoading', false);
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  createTripEvent(context: any, payload: Event) {
    context.commit('isLoading', true);
    const newPayload = _createEventRequestPayload(payload);
    if (newPayload.start_time) {
      newPayload.start_time = moment(newPayload.start_time).format(DATE_TIME_FORMAT);
    }
    if (newPayload.end_time) {
      newPayload.end_time = moment(newPayload.end_time).format(DATE_TIME_FORMAT);
    }
    tripService
      .createTripEvent(context.state.tripDetail.id, newPayload)
      .then((result: any) => {
        if (result.success) {
          context.dispatch(Actions.GET_TRIP_DETAIL, context.state.tripDetail.id, { root: true });
        } else {
          context.commit('isLoading', false);
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  updateTrip(context: any, payload: Trip) {
    context.commit('isLoading', true);
    payload.start_date = moment(payload.start_date).format(DATE_FORMAT);
    payload.end_date = moment(payload.end_date).format(DATE_FORMAT);

    tripService
      .updateTrip(payload)
      .then((result: any) => {
        if (result.success) {
          context.commit('isLoading', false);
          context.commit('updateTrip', payload);
        } else {
          context.commit('isLoading', false);
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
      });
  },
  // TODO - A new action for updating trip day action

  updateTripEvent(context: any, payload: Event) {
    context.commit('isLoading', true);
    const newPayload = _createEventRequestPayload(payload);
    if (newPayload.start_time) {
      newPayload.start_time = moment(newPayload.start_time).format(DATE_TIME_FORMAT);
    }
    if (newPayload.end_time) {
      newPayload.end_time = moment(newPayload.end_time).format(DATE_TIME_FORMAT);
    }
    tripService
      .updateTripEvent(context.state.tripDetail.id, newPayload)
      .then((result: any) => {
        if (result.success) {
          console.log('tripDetail.id', context.state.tripDetail.id);
          context.dispatch(Actions.GET_TRIP_DETAIL, context.state.tripDetail.id, { root: true });
        } else {
          context.commit('isLoading', false);
          context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: result.error }, { root: true });
        }
      })
      .catch((error: any) => {
        context.commit('isLoading', false);
        context.dispatch(Actions.CREATE_ALERT, { type: 'error', message: error.error }, { root: true });
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
  getTripDetail(state: TripState, payload: any) {
    if (payload) {
      if (!isEmpty(payload.start_date)) {
        payload.start_date = moment(payload.start_date).format(DATE_FORMAT);
      }
      if (!isEmpty(payload.end_date)) {
        payload.end_date = moment(payload.end_date).format(DATE_FORMAT);
      }
      if (!isEmpty(payload.trip_day)) {
        map(payload.trip_day, (tripDay: TripDay) => {
          tripDay.trip_date = moment(tripDay.trip_date).format(DATE_FORMAT);
          map(tripDay.events, (tripEvent: Event) => {
            if (!isEmpty(tripEvent.start_time)) {
              tripEvent.start_time = moment(tripEvent.start_time).format(DATE_TIME_FORMAT);
            }
            if (!isEmpty(tripEvent.end_time)) {
              tripEvent.end_time = moment(tripEvent.end_time).format(DATE_TIME_FORMAT);
            }
            return tripEvent;
          });
          return tripDay;
        });
      }
      payload.archived = payload.archived === 1;
    }
    state.tripDetail = payload;
  },
  updateTrip(state: TripState, payload: Trip) {
    Object.keys(payload).forEach(prop => {
      state.tripDetail[prop] = payload[prop];
    });
  },
};

export const trip: Module<TripState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};
