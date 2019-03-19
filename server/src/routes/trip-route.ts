import * as express from 'express';
import { TripController } from '../controllers/trip-controller';

const router = express.Router();
const tripController = new TripController();

// Get trips
router.post('/trip', tripController.retrieve);
// Create trip
router.post('/trip/create', tripController.create);
// Get trip detail
router.get('/trip/:id', tripController.retrieveDetail);
// Edit trip
router.put('/trip', tripController.update);
// Delete trip
router.delete('/trip/:id', tripController.delete);

export = router;
