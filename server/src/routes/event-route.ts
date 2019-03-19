import * as express from 'express';
import { EventController } from '../controllers/event-controller';

const router = express.Router();
const eventController = new EventController();

// Get trips
router.post('/event', eventController.retrieve);
// Create trip
router.post('/event/create', eventController.create);
// Edit trip
router.put('/event', eventController.update);
// Delete trip
router.delete('/event/:id', eventController.delete);

export = router;
