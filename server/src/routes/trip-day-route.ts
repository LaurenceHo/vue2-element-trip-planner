import * as express from 'express';
import { TripDayController } from '../controllers/trip-day-controller';

const router = express.Router();
const tripDayController = new TripDayController();

router.get('/trip/:trip_id/day', tripDayController.retrieve);

router.get('/trip/:trip_id/day/:trip_day_id', tripDayController.retrieveDetail);

router.post('/trip/:trip_id/day/create', tripDayController.create);

router.put('/trip/:trip_id/day/update', tripDayController.update);

router.delete('trip/:trip_id/day/:trip_day_id', tripDayController.delete);

export = router;
