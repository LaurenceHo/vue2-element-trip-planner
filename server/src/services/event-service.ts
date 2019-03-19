import { Event } from '../models/event';
import { EventRepository } from '../repositories/event-repository';
import { BaseService } from './base-service';

const eventRepository = new EventRepository();

const whereString = (whereObject: object): string => {
  if (whereObject) {
    let result = '';
    for (const prop in whereObject) {
      if (whereObject.hasOwnProperty(prop)) {
        if (prop === 'start_time') {
          result += ` ${prop} >= ${whereObject[ prop ]} AND`;
        } else if (prop === 'end_time') {
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

export class EventService implements BaseService<Event> {
  retrieve(where: object, callback: any): void {
    eventRepository.retrieve(null, whereString(where), callback);
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
