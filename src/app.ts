import express from 'express';
import "reflect-metadata";
import createConnection from "./database";
import { router } from "./routes";
import dotenv from 'dotenv';
import FirebaseAdminSDK from './services/storage/firebaseAdminSDK';

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const firebase = new FirebaseAdminSDK();
firebase.initializeService();

createConnection();
const app = express();

app.use(express.json());
app.use(router);


export default app;