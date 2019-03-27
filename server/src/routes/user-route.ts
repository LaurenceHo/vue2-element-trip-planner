import * as express from 'express';
import { UserController } from '../controllers/user-controller';

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.resister);
router.post('/signin', userController.signIn);
router.put('/update', userController.update);
router.post('/logout', userController.logout);

export = router;
