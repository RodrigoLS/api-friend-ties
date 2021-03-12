import { Router } from 'express';

import authMiddleware from './middlewares/authMiddleware';

import UserController from './controllers/userController';
import AuthController from './controllers/authController';

const router = Router();

const userController = new UserController();
const authController = new AuthController();

router.post('/auth', authController.authenticate);
router.post("/users", userController.create);
router.get("/users", authMiddleware, userController.index);

export { router }; 