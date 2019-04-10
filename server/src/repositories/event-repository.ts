import { knex } from '../database/knex';
import { Event } from '../models/event';
import { BaseRepository } from './base-repository';

export class EventRepository implements BaseRepository<Event> {
  retrieve(columns: string[], whereClauses: any, callback: any): void {
    if (columns) {
      knex('event')
        .columnInfo(columns)
        .where(whereClauses)
        .then((results: Event[]) => callback(results))
        .catch((err: any) => callback(null, err));
    } else {
      knex('event')
        .where(whereClauses)
        .then((results: Event[]) => callback(results))
        .catch((err: any) => callback(null, err));
    }
  }

  create(item: Event, callback: any): void {
    knex('event')
      .insert(item)
      .then((returning: any) => callback({ event_id: returning[0] }))
      .catch((err: any) => callback(null, err));
  }

  update(item: Event, callback: any): void {
    item.updated_at = knex.fn.now();
    knex('event')
      .where({ id: item.id, user_id: item.user_id, trip_day_id: item.trip_day_id })
      .update(item)
      .then((result: any) => callback(result))
      .catch((err: any) => callback(null, err));
  }

  delete(id: number, callback: any): void {
    knex('event')
      .where({ id })
      .del()
      .then((result: any) => callback(result))
      .catch((err: any) => callback(null, err));
  }
}
