import * as express from 'express';
import { UtilController } from '../controllers/util-controller';

const router = express.Router();
const utilController = new UtilController();

router.get('/timezone', utilController.retrieveTimezone);
router.get('/category', utilController.retrieveCategories);
router.get('/currency', utilController.retrieveCurrencies);

export = router;
