import { Trip } from '../models/trip';

export interface RootState {
  version: string;
}

export interface DashboardState {
  toggle: boolean;
  edit: {
    isEditMode: boolean;
    idInEdit: number;
    component: 'trip' | 'tripDay' | 'tripEvent';
  };
  openCreateTripDialog: boolean;
  openCreateTripDayDialog: boolean;
  openCreateEventDialog: boolean;
  currentMenu: 'upcoming' | 'current' | 'past' | 'archived';
  selectedTripDayId: number;
}

export interface AlertState {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export interface TripState {
  tripList: Trip[];
  tripDetail: Trip;
}
