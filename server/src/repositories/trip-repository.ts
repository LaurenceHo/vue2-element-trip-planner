import { knex } from '../database/knex';
import { Trip } from '../models/trip';
import { TripDay } from '../models/trip-day';
import { BaseRepository } from './base-repository';

export class TripRepository implements BaseRepository<Trip> {
  retrieveDetail(whereClauses: any, callback: any): void {
    let trip: Trip = null;
    knex('trip')
      .where(whereClauses)
      .then((results: Trip[]) => {
        trip = results[ 0 ];
        if (trip) {
          knex('trip_day')
            .where({trip_id: whereClauses.id})
            .then((results: TripDay[]) => {
              trip.trip_day = results;
              callback(trip);
            })
            .catch((err: any) => callback(err));
        } else {
          callback();
        }
      })
      .catch((err: any) => callback(err));
  }
  
  retrieve(columns: string[], whereClauses: any, callback: any): void {
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
    knex('trip')
      .insert(item, 'id')
      .then((returning: any) => callback({trip_id: returning[ 0 ]}))
      .catch((err: any) => callback(err));
  }
  
  update(item: Trip, callback: any): void {
    item.updated_at = knex.fn.now();
    knex('trip')
      .where({id: item.id, user_id: item.user_id})
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
