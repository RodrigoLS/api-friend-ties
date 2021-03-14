import express from 'express';
import "reflect-metadata";
import createConnection from "./database";
import { router } from "./routes";
import dotenv from 'dotenv';

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export default app;