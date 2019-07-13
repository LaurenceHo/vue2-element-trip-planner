export const Actions = {
  CREATE_ALERT: 'alert/create',
  CLEAR_ALERT: 'alert/clear',

  LOGIN: 'authentication/login',
  LOGOUT: 'authentication/logout',
  REGISTER: 'authentication/register',

  TOGGLE_SIDE_BAR: 'dashboard/toggleSideBar',
  SET_SIDE_MENU: 'dashboard/setSideMenu',
  UPDATE_SELECTED_TRIP_DAY_ID: 'dashboard/updateSelectedTripDayId',
  UPDATE_EDIT: 'dashboard/updateEdit',
  OPEN_TRIP_FORM: 'dashboard/openTripForm',
  OPEN_TRIP_DAY_FORM: 'dashboard/openTripDayForm',
  OPEN_TRIP_EVENT_FORM: 'dashboard/openTripEventForm',

  GET_TRIP_LIST: 'trip/getTripList',
  GET_TRIP_DETAIL: 'trip/getTripDetail',
  CREATE_TRIP: 'trip/createTrip',
  UPDATE_TRIP: 'trip/updateTrip',
  CREATE_TRIP_DAY: 'trip/createTripDay',
  UPDATE_TRIP_DAY: 'trip/updateTripDay',
  CREATE_TRIP_EVENT: 'trip/createTripEvent',
  UPDATE_TRIP_EVENT: 'trip/updateTripEvent',
  DELETE_TRIP_EVENT: 'trip/deleteTripEvent',
};
