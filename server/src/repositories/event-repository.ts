import DatabaseService from '../database/database-service';
import { knex } from '../database/knex';
import { Event } from '../models/event';
import { BaseRepository } from './base-repository';
import { knex } from '../database/knex';

const database = new DatabaseService();

export class EventRepository implements BaseRepository<Event> {
  retrieve(columns: string[], whereClauses: object, callback: any): void {
    if (columns) {
      knex('event')
        .columnInfo(columns)
        .where(whereClauses)
        .then((results: Event[]) => callback(results))
        .catch((err: any) => callback(err));
    } else {
      knex('event')
        .where(whereClauses)
        .then((results: Event[]) => callback(results))
        .catch((err: any) => callback(err));
    }
  }
  
  create(item: Event, callback: any): void {
    knex('event')
      .insert(item, 'id')
      .then((returning: any) => callback({event_id: returning[ 0 ]}))
      .catch((err: any) => callback(err));
  }
  
  update(item: Event, callback: any): void {
    item.updated_at = knex.fn.now();
    
    knex('event')
      .where({id: item.id})
      .update(item)
      .then((result: any) => callback(result))
      .catch((err: any) => callback(err));
  }
  
  delete(id: number, callback: any): void {
    knex('trip')
      .where({id})
      .del()
      .then((result: any) => callback(result))
      .catch((err: any) => callback(err));
  }
}
