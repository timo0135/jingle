import { Router } from 'express';
import * as UserController from "../controllers/userController";
import {authenticate} from "../middlewares/middlewares";

const router = Router();

router.post('/register', UserController.register);
router.post('/signin', UserController.signin);
router.post('/refresh', UserController.refresh);
router.get('/users/:id', authenticate, UserController.getUser);
router.patch('/users/:id', authenticate, UserController.updateUser);

export default router;
