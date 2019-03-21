import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';

import { schema } from './database/schema';
import * as eventRoute from './routes/event-route';
import * as tripRoute from './routes/trip-route';

const expressSanitizer = require('express-sanitizer');

schema();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client'), {index: false}));
app.use(expressSanitizer());

const logger = (req: any, res: any, next: any) => {
  console.log('request url:', req.originalUrl);
  console.log('request params:', req.params);
  console.log('request body:', req.body);
  next();
};
app.use(logger);

const corsHeader = (req: any, res: any, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
};
app.use(corsHeader);
app.use('/api', tripRoute);
app.use('/api', eventRoute);
app.get('/*', (req: any, res: any) => res.sendFile(path.resolve(__dirname, '../client', 'index.html')));

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error('Not Found');
  next(err);
});

export = app;
