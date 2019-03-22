import DatabaseService from '../database/database-service';
import { Event } from '../models/event';
import { BaseRepository } from './base-repository';
import { knex } from '../database/knex';

const database = new DatabaseService();

const queryByColumns = (columns: string[], query: string, options: any): string => {
  if (columns) {
    options.push(columns);
    return query.replace('*', '??');
  } else {
    return query;
  }
};

export class EventRepository implements BaseRepository<Event> {
  retrieve(columns: string[], where: string, callback: any): void {
    const options: any[] = [];
    let query = 'SELECT * FROM event ';
    query = queryByColumns(columns, query, options);
    
    if (where) {
      query += 'WHERE' + where;
    }
    
    database.query(query, options).then(
      (results: Event[]) => callback(results)
    ).catch(err => callback(err));
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
