import * as express from 'express';
import { EventController } from '../controllers/event-controller';

const router = express.Router();
const eventController = new EventController();

router.post('/:trip_id/day/:trip_day_id/event', eventController.retrieve);

router.post('/:trip_id/day/:trip_day_id/event/create', eventController.create);

router.put('/:trip_id/day/:trip_day_id/event/update', eventController.update);

router.delete('/:trip_id/day/:trip_day_id/event/:event_id', eventController.delete);

export = router;
