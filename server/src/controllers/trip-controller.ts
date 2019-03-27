import * as express from 'express';
import { Trip } from '../models/trip';
import { TripService } from '../services/trip-service';
import { BaseController } from './base-controller';

const tripService = new TripService();

export class TripController implements BaseController<TripService> {
  retrieveDetail(req: express.Request, res: express.Response): void {
    try {
      const id: number = req.params.trip_id;
      tripService.retrieveDetail(id, (result: Trip, error: any) => {
        if (error) {
          res.status(400).send({error});
        } else {
          res.status(200).send({success: true, result});
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
  
  retrieve(req: express.Request, res: express.Response): void {
    try {
      const where: object = req.body;
      tripService.retrieve(where, (result: Trip[], error: any) => {
        if (error) {
          res.status(400).send({error});
        } else {
          res.status(200).send({success: true, result});
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
  
  create(req: express.Request, res: express.Response): void {
    try {
      const trip: Trip = req.body as Trip;
      tripService.create(trip, (result: any, error: any) => {
        if (error) {
          res.status(400).send({error});
        } else {
          res.status(200).send({success: true, result});
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
  
  update(req: express.Request, res: express.Response): void {
    try {
      const trip: Trip = req.body as Trip;
      tripService.update(trip, (result: any, error: any) => {
        if (error) {
          res.status(400).send({error});
        } else {
          res.status(200).send({success: true, result});
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
  
  delete(req: express.Request, res: express.Response): void {
    try {
      const id: number = req.params.trip_id;
      tripService.delete(id, (result: any, error: any) => {
        if (error) {
          res.status(400).send({error});
        } else {
          res.status(200).send({success: true, result});
        }
      });
    } catch (e) {
      console.error(e);
      res.status(400).send({error: 'error in your request'});
    }
  }
}
