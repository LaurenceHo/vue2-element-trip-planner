import DatabaseService from '../database/database-service';
import { Event } from '../models/event';
import { BaseRepository } from './base-repository';

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
