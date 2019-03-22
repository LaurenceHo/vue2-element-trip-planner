export interface Event {
  id: number;
  trip_day_id: number;
  category_id: number;
  start_time: string;
  end_time: string;
  title: string;
  start_location: string;
  end_location: number;
  note: string;
  tag: string[];
  cost: number;
  currency: string;
  created_at: string;
  updated_at: string;
}
