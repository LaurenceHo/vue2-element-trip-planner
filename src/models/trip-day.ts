import { Event } from './event';

export interface TripDay {
  id?: number;
  trip_id: number;
  name?: string;
  trip_date: string;
  trip_date_object: Date;
  events?: Event[];
}
