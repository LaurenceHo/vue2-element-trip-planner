import { Event } from '../models/event';
import { EventRepository } from '../repositories/event-repository';
import { BaseService } from './base-service';

const eventRepository = new EventRepository();

export class EventService implements BaseService<Event> {
  retrieve(where: object, callback: any): void {
    eventRepository.retrieve(null, where, callback);
  }
  
  create(item: Event, callback: any): void {
    eventRepository.create(item, callback);
  }
  
  update(item: Event, callback: any): void {
    eventRepository.update(item, callback);
  }
  
  delete(id: number, callback: any): void {
    eventRepository.delete(id, callback);
  }
}
