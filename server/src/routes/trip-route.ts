import * as express from 'express';
import { TripController } from '../controllers/trip-controller';

const router = express.Router();
const tripController = new TripController();

// Get trips
router.post('/trip', tripController.retrieve);
// Get trip detail
router.get('/trip/:trip_id', tripController.retrieveDetail);
// Create trip
router.post('/trip/create', tripController.create);
// Update trip
router.put('/trip/update', tripController.update);
// Delete trip
router.delete('/trip/:trip_id', tripController.delete);

export = router;
