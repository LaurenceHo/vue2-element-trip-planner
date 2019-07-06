import { TripDay } from './trip-day';

export interface Trip {
  id?: number;
  timezone_id: number;
  start_date?: string;
  end_date?: string;
  start_date_object?: Date;
  end_date_object?: Date;
  name?: string;
  destination: string;
  archived: boolean | number;
  trip_day?: TripDay[];
}
