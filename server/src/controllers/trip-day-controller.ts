import express = require('express');
import { TripDay } from '../models/trip-day';
import { TripDayService } from '../services/trip-day-service';
import { BaseController } from './base-controller';

const tripDayService = new TripDayService();

export class TripDayController implements BaseController<TripDayService> {
  retrieveDetail(req: express.Request, res: express.Response): void {
    try {
      const trip_id: number = req.params.trip_id;
      const trip_day_id: number = req.params.trip_day_id;
      
      tripDayService.retrieveDetail(trip_day_id, (result: TripDay, error: any) => {
        if (error) {
          res.status(500).send({error});
        } else {
          if (result.trip_id !== trip_id) {
            res.status(400).send({message: 'The data is not correct'});
          }
          res.status(200).send(result);
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
  
  retrieve(req: express.Request, res: express.Response): void {
    try {
      const trip_id: number = req.params.trip_id;
      tripDayService.retrieve({trip_id}, (result: TripDay[], error: any) => {
        if (error) {
          res.send({error});
        } else {
          res.status(200).send(result);
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
  
  create(req: express.Request, res: express.Response): void {
    try {
      const tripDay: TripDay = req.body as TripDay;
      tripDayService.create(tripDay, (result: any, error: any) => {
        if (error) {
          res.send({error});
        } else {
          res.status(200).send({success: 'success', result});
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
  
  update(req: express.Request, res: express.Response): void {
    try {
      const tripDay: TripDay = req.body as TripDay;
      tripDayService.update(tripDay, (result: any, error: any) => {
        if (error) {
          res.send({error});
        } else {
          res.status(200).send({success: 'success', result});
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
  
  delete(req: express.Request, res: express.Response): void {
    try {
      const trip_day_id: number = req.params.trip_day_id;
      tripDayService.delete(trip_day_id, (result: any, error: any) => {
        if (error) {
          res.send({error});
        } else {
          res.status(200).send({success: 'success', result});
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
}
