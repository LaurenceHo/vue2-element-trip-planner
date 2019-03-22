import DatabaseService from '../database/database-service';
import { knex } from '../database/knex';
import { Event } from '../models/event';
import { BaseRepository } from './base-repository';

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
    database.query('INSERT INTO event SET ?', item).then(
      (result: any) => callback({event_id: result.insertId})
    ).catch(err => callback(err));
  }
  
  update(item: Event, callback: any): void {
    database.query('UPDATE event SET ? WHERE id = ?', [ item, item.id ]).then(
      (result: any) => callback(result)
    ).catch(err => callback(err));
  }
  
  delete(id: number, callback: any): void {
    database.query('DELETE FROM event WHERE id = ?', [ id ]).then(
      (result: any) => callback(result)
    ).catch(err => callback(err));
  }
}
