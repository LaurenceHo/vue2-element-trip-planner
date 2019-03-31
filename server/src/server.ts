import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as morgan from 'morgan';
import * as path from 'path';

import { schema } from './database/schema';
import * as eventRoute from './routes/event-route';
import * as tripDayRoute from './routes/trip-day-route';
import * as tripRoute from './routes/trip-route';
import * as userRoute from './routes/user-route';

const expressSanitizer = require('express-sanitizer');

schema();

const app = express();

app.set('superSecret', 'TripPlannerRestfulApis');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client'), {index: false}));
app.use(expressSanitizer());
app.use(morgan('dev'));

const corsHeader = (req: any, res: any, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(corsHeader);

const jwtAuthentication = (req: any, res: express.Response, next: any) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[ 0 ] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[ 1 ], app.get('superSecret'), (error: any, decode: any) => {
      if (error) {
        return res.status(403).send({
          success: false,
          message: 'Authentication failed.'
        });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
app.use('/api/trip', jwtAuthentication);
app.use('/api/user/update', jwtAuthentication);

app.use('/api/trip', tripRoute);
app.use('/api/trip', tripDayRoute);
app.use('/api/trip', eventRoute);
app.use('/api/user', userRoute);

app.get('/*', (req: express.Request, res: express.Response) =>
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error('Not Found');
  next(err);
});

export = app;
