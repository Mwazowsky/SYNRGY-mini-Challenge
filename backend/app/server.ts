import express, { Express, Request, Response } from 'express'; // third-party module
import path from 'path'; // core module
import knex from "knex";
import cors from 'cors';

import { Model } from "objection";

import CarsApi from './routes/api/carsApi';
import AuthApi from './routes/api/authApi';
import swaggerDocs from "./utils/swagger";

const { PORT = 8060 } = process.env;
const PUBLIC_DIR = path.join(__dirname, 'public');

class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.static(PUBLIC_DIR));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      cors({
        origin: ['http://localhost:5173', 'http://localhost:3000'],
      })
    );

    const knexInstance = knex({
      client: "postgresql",
      connection: {
        database: "bcr_db_1",
        user: "postgres",
        password: "postgres",
      },
    });

    Model.knex(knexInstance);

    this.app.use('/api/cars', CarsApi.routes());
    this.app.use('/api/user', AuthApi.routes());

    swaggerDocs(this.app, 8000);
  }

  run() {
    this.app.listen(PORT, () => {
      console.log('Server running on http://localhost:%s', PORT);
    });
  }
}

new Server().run();