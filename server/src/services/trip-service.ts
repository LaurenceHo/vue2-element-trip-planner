import { Trip } from '../models/trip';
import { TripRepository } from '../repositories/trip-repository';
import { BaseService } from './base-service';

const tripRepository = new TripRepository();

export class TripService implements BaseService<Trip> {
  retrieveDetail(id: number, callback: any): void {
    tripRepository.retrieveDetail(id, callback);
  }
  
  retrieve(where: object, callback: any): void {
    tripRepository.retrieve(null, where, callback);
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
