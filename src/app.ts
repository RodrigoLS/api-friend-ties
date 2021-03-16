import express from 'express';
import "reflect-metadata";
import createConnection from "./database";
import { router } from "./routes";
import dotenv from 'dotenv';
import morgan from 'morgan'

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

createConnection();
const app = express();

app.use(express.json());
app.use(morgan('dev'))
app.use(router);



export default app;