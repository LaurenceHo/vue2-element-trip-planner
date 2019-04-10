import * as express from 'express';
import { Trip } from '../models/trip';
import { TripService } from '../services/trip-service';
import { BaseController } from './base-controller';

const tripService = new TripService();

export class TripController implements BaseController<TripService> {
  retrieveDetail(req: any, res: express.Response): void {
    try {
      const id: number = req.params.trip_id;
      const user_id: number = req.user.id;
      tripService.retrieveDetail({ id, user_id }, (result: Trip, error: any) => {
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
      const whereClauses: any = req.body;
      whereClauses.user_id = req.user.id;
      tripService.retrieve(whereClauses, (result: Trip[], error: any) => {
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
      const trip: Trip = req.body;
      trip.user_id = req.user.id;
      tripService.create(trip, (result: any, error: any) => {
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
      const trip: Trip = req.body;
      trip.user_id = req.user.id;
      tripService.update(trip, (result: any, error: any) => {
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
      const id: number = req.params.trip_id;
      tripService.delete(id, (result: any, error: any) => {
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
