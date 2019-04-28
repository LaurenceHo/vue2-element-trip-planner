import * as express from 'express';
import { UtilService } from '../services/util-service';

const utilService = new UtilService();

export class UtilController {
  retrieveTimezone(req: express.Request, res: express.Response): void {
    try {
      utilService.retrieveTimezone((result: any, error: any) => {
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

  retrieveCategories(req: express.Request, res: express.Response): void {
    try {
      utilService.retrieveCategories((result: any, error: any) => {
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

  retrieveCurrencies(req: express.Request, res: express.Response): void {
    try {
      utilService.retrieveCurrencies((result: any, error: any) => {
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
