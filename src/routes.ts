import { Router } from 'express';

import multer from 'multer';
import config from './config/multer';

import authMiddleware from './middlewares/authMiddleware';

import UserController from './controllers/userController';
import AuthController from './controllers/authController';
import PostController from './controllers/postController';

const router = Router();

const multerConfig = config;

const userController = new UserController();
const authController = new AuthController();
const postController = new PostController();

router.post("/auth", authController.authenticate);

router.post("/users", userController.create);
router.put("/users/:userId", authMiddleware, userController.edit);
router.get("/users", authMiddleware, userController.index);
router.get("/users/:userId", authMiddleware, userController.getUser);

//multer.array()
router.post("/posts", authMiddleware, multer(multerConfig).single('file'), postController.create);

export { router }; 