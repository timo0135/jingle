import { Router } from 'express';
import * as UserController from "../controllers/userController";

const router = Router();

router.post('/register', UserController.register);
router.post('/signin', UserController.signin);
router.post('/refresh', UserController.refresh);

export default router;
