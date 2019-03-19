import { Trip } from '../models/trip';
import { TripRepository } from '../repositories/trip-repository';
import { BaseService } from './base-service';

const tripRepository = new TripRepository();

const whereString = (whereObject: object): string => {
  if (whereObject) {
    let result = '';
    for (const prop in whereObject) {
      if (whereObject.hasOwnProperty(prop)) {
        if (prop === 'start_date') {
          result += ` ${prop} >= ${whereObject[ prop ]} AND`;
        } else if (prop === 'end_date') {
          result += ` ${prop} <= ${whereObject[ prop ]} AND`;
        } else {
          result += ` ${prop} = ${whereObject[ prop ]} AND`;
        }
      }
    }
    
    if (result.endsWith('AND')) {
      result = result.substring(0, result.lastIndexOf('AND'));
    }
    return result;
  }
};

export class TripService implements BaseService<Trip> {
  retrieveDetail(id: number, callback: any): void {
    tripRepository.retrieveDetail(id, callback);
  }
  
  retrieve(where: object, callback: any): void {
    tripRepository.retrieve(null, whereString(where), callback);
  }
  
  create(item: Trip, callback: any): void {
    tripRepository.create(item, callback);
  }
  
  update(item: Trip, callback: any): void {
    tripRepository.update(item, callback);
  }
  
  delete(id: number, callback: any): void {
    tripRepository.delete(id, callback);
  }
}
