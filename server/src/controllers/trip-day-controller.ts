import * as express from 'express';
import { TripDay } from '../models/trip-day';
import { TripDayService } from '../services/trip-day-service';
import { BaseController } from './base-controller';

const tripDayService = new TripDayService();

export class TripDayController implements BaseController<TripDayService> {
  retrieveDetail(req: any, res: express.Response): void {
    try {
      const trip_day_id: number = req.params.trip_day_id;
      const user_id: number = req.user.id;
      tripDayService.retrieveDetail({ trip_day_id, user_id }, (result: TripDay, error: any) => {
        if (error) {
          res.status(400).send({ error: error.sqlMessage });
        } else {
          res.status(200).send({ success: true, result });
        }
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  retrieve(req: any, res: express.Response): void {
    try {
      const trip_id: number = req.params.trip_id;
      const user_id: number = req.user.id;
      tripDayService.retrieve({ trip_id, user_id }, (result: TripDay[], error: any) => {
        if (error) {
          res.status(400).send({ error: error.sqlMessage });
        } else {
          res.status(200).send({ success: true, result });
        }
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  create(req: any, res: express.Response): void {
    try {
      const tripDay: TripDay = req.body;
      tripDay.trip_id = req.params.trip_id;
      tripDay.user_id = req.user.id;
      tripDayService.create(tripDay, (result: any, error: any) => {
        if (error) {
          res.status(400).send({ error: error.sqlMessage });
        } else {
          res.status(200).send({ success: true, result });
        }
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  update(req: any, res: express.Response): void {
    try {
      const tripDay: TripDay = req.body;
      tripDay.trip_id = req.params.trip_id;
      tripDay.user_id = req.user.id;
      tripDayService.update(tripDay, (result: any, error: any) => {
        if (error) {
          res.status(400).send({ error: error.sqlMessage });
        } else {
          res.status(200).send({ success: true, result });
        }
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  delete(req: express.Request, res: express.Response): void {
    try {
      const trip_day_id: number = req.params.trip_day_id;
      tripDayService.delete(trip_day_id, (result: any, error: any) => {
        if (error) {
          res.status(400).send({ error: error.sqlMessage });
        } else {
          res.status(200).send({ success: true, result });
        }
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  }
}
