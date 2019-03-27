import * as express from 'express';
import { Event } from '../models/event';
import { EventService } from '../services/event-service';
import { BaseController } from './base-controller';

const eventService = new EventService();

export class EventController implements BaseController<EventService> {
  retrieve(req: express.Request, res: express.Response): void {
    try {
      const where: object = req.body;
      
      eventService.retrieve(where, (result: Event[], error: any) => {
        if (error) {
          res.status(400).send({error});
        } else {
          res.status(200).send({success: true, result});
        }
      });
    } catch (error) {
      res.status(400).send({error});
    }
  }
  
  create(req: express.Request, res: express.Response): void {
    try {
      const event: Event = req.body as Event;
      eventService.create(event, (result: any, error: any) => {
        if (error) {
          res.status(400).send({error});
        } else {
          res.status(200).send({success: true, result});
        }
      });
    } catch (error) {
      res.status(400).send({error});
    }
  }
  
  update(req: express.Request, res: express.Response): void {
    try {
      const event: Event = req.body as Event;
      eventService.update(event, (result: any, error: any) => {
        if (error) {
          res.status(400).send({error});
        } else {
          res.status(200).send({success: true, result});
        }
      });
    } catch (error) {
      res.status(400).send({error});
    }
  }
  
  delete(req: express.Request, res: express.Response): void {
    try {
      const id: number = req.params.id;
      eventService.delete(id, (result: any, error: any) => {
        if (error) {
          res.status(400).send({error});
        } else {
          res.status(200).send({success: true, result});
        }
      });
    } catch (error) {
      res.status(400).send({error});
    }
  }
}
