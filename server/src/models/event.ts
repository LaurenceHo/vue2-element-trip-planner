export interface Event {
  id: number;
  trip_id: number;
  category_id: number;
  title: string;
  start_time: string;
  end_time: string;
  start_location: string;
  end_location: number;
  note: number;
  cost: number;
  currency: string;
}
