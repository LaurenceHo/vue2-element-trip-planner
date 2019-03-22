import DatabaseService from '../database/database-service';
import { knex } from '../database/knex';
import { Trip } from '../models/trip';
import { TripDay } from '../models/trip-day';
import { BaseRepository } from './base-repository';

const database = new DatabaseService();

export class TripRepository implements BaseRepository<Trip> {
  retrieveDetail(id: number, callback: any): void {
    let trip: Trip = null;
    knex('trip')
      .where({id})
      .then((results: Trip[]) => {
        trip = results[ 0 ];
        knex('trip_day')
          .where({trip_id: id})
          .then((results: TripDay[]) => {
            // TODO, put TripDay object
            callback(trip);
          })
          .catch((err: any) => callback(err));
      })
      .catch((err: any) => callback(err));
  }
  
  retrieve(columns: string[], whereClauses: object, callback: any): void {
    if (columns) {
      knex('trip')
        .columnInfo(columns)
        .where(whereClauses)
        .then((results: Trip[]) => callback(results))
        .catch((err: any) => callback(err));
    } else {
      knex('trip')
        .where(whereClauses)
        .then((results: Trip[]) => callback(results))
        .catch((err: any) => callback(err));
    }
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
