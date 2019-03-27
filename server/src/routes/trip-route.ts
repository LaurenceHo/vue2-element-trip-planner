import * as express from 'express';
import { TripController } from '../controllers/trip-controller';

const router = express.Router();
const tripController = new TripController();

// Get trips
router.post('', tripController.retrieve);
// Get trip detail
router.get('/:trip_id', tripController.retrieveDetail);
// Create trip
router.post('/create', tripController.create);
// Update trip
router.put('/update', tripController.update);
// Delete trip
router.delete('/:trip_id', tripController.delete);

export = router;
