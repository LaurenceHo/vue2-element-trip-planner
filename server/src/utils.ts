import * as express from 'express';

export const parameterIdValidation = (paramId: any, res: express.Response): number => {
  if (!isNaN(paramId)) {
    return Number(paramId);
  } else {
    res.status(400).send({ error: 'Bad request' });
  }
};
