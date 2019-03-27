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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client'), {index: false}));
app.use(expressSanitizer());
app.use(morgan('dev'));

const corsHeader = (req: any, res: any, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
};
app.use(corsHeader);

const jwtAuthentication = (req: any, res: any, next: any) => {
  const token = req.body.token || req.query.token || req.headers[ 'x-access-token' ];
  
  if (token) {
    jwt.verify(req.header.authorization.split(' ')[ 1 ], 'TripPlannerRestfulApis', (error: any, decode: any) => {
      if (error) {
        req.user = undefined;
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    req.user = undefined;
    next();
  }
};
const authenticationRoute = express.Router();
authenticationRoute.use(jwtAuthentication);
app.use('/api', authenticationRoute);

app.use('/api/trip', tripRoute);
app.use('/api/trip', tripDayRoute);
app.use('/api/trip', eventRoute);
app.use('/api/user', userRoute);

app.get('/*', (req: express.Request, res: express.Response) => res.sendFile(path.resolve(__dirname, '../client', 'index.html')));

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error('Not Found');
  next(err);
});

export = app;
