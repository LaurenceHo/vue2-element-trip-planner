import express = require('express');
import { Trip } from '../models/trip';
import { TripService } from '../services/trip-service';
import { BaseController } from './base-controller';

const tripService = new TripService();

export class TripController implements BaseController<TripService> {
  retrieveDetail(req: express.Request, res: express.Response): void {
    try {
      const id: number = req.params.id;
      tripService.retrieveDetail(id, (result: Trip, error: any) => {
        if (error) {
          res.send({error});
        } else {
          res.status(200).send(result);
        }
      });
    } catch (e) {
      console.error(e);
      res.send({error: 'error in your request'});
    }
  }
  
  retrieve(req: express.Request, res: express.Response): void {
    try {
      const where: object = req.body;
      tripService.retrieve(where, (result: Trip[], error: any) => {
        if (error) {
          res.send({error});
        } else {
          res.status(200).send(result);
        }
      });
    } catch (e) {
      console.error(e);
      res.send({error: 'error in your request'});
    }
  }
  
  create(req: express.Request, res: express.Response): void {
    try {
      const trip: Trip = req.body as Trip;
      tripService.create(trip, (result: any, error: any) => {
        if (error) {
          res.send({error});
        } else {
          res.status(200).send({success: 'success', result});
        }
      });
    } catch (e) {
      console.error(e);
      res.send({error: 'error in your request'});
    }
  }
  
  update(req: express.Request, res: express.Response): void {
    try {
      const trip: Trip = req.body as Trip;
      tripService.update(trip, (result: any, error: any) => {
        if (error) {
          res.send({error});
        } else {
          res.status(200).send({success: 'success', result});
        }
      });
    } catch (e) {
      console.error(e);
      res.send({error: 'error in your request'});
    }
  }
  
  delete(req: express.Request, res: express.Response): void {
    try {
      const id: number = req.params.id;
      tripService.delete(id, (result: any, error: any) => {
        if (error) {
          res.send({error});
        } else {
          res.status(200).send({success: 'success', result});
        }
      });
    } catch (e) {
      console.error(e);
      res.send({error: 'error in your request'});
    }
  }
}
