import DatabaseService from '../database/database-service';
import { Event } from '../models/event';
import { Trip } from '../models/trip';
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

export class TripRepository implements BaseRepository<Trip> {
  retrieveDetail(id: number, callback: any): void {
    console.log(JSON.stringify(id));
    let trip: Trip = null;
    database.query('SELECT * FROM trip WHERE id = ?', [ id ]).then(
      (results: Trip[]) => {
        trip = results[ 0 ];
        database.query('SELECT * FROM event WHERE trip_id = ?', [ id ]).then(
          (results: Event[]) => {
            trip.events = results;
            callback(trip);
          }
        ).catch(err => callback(err));
      }
    ).catch(err => callback(err));
  }
  
  retrieve(columns: string[], where: string, callback: any): void {
    const options: any[] = [];
    let query = 'SELECT * FROM trip ';
    query = queryByColumns(columns, query, options);
    
    if (where) {
      query += 'WHERE' + where;
    }
    
    database.query(query, options).then(
      (results: Trip[]) => callback(results)
    ).catch(err => callback(err));
  }
  
  create(item: Trip, callback: any): void {
    database.query('INSERT INTO trip SET ?', item).then(
      (result: any) => callback({trip_id: result.insertId})
    ).catch(err => callback(err));
  }
  
  update(item: Trip, callback: any): void {
    database.query('UPDATE trip SET ? WHERE id = ?', [ item, item.id ]).then(
      (result: any) => callback(result)
    ).catch(err => callback(err));
  }
  
  delete(id: number, callback: any): void {
    database.query('DELETE FROM trip WHERE id = ?', [ id ]).then(
      (result: any) => callback(result)
    ).catch(err => callback(err));
  }
}
