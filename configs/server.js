import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import apiLimiter from "../src/middlewares/validar-cant-peticiones.js";
import { dbConnection } from "./db.js";
import authRoutes from "../src/auth/auth.routes.js";
import fieldRoutes from "../src/fields/field.routes.js";
import reservationRoutes from "../src/reservations/reservation.routes.js";

class ExpressServer {
  constructor() {
    this.app = express();
    this.app.set('trust proxy', 1);
    this.port = process.env.PORT || 3001;
    this.basePath = "/sportsFieldManager/v1";

    this.middlewares();
    this.conectarDB();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: ["Content-Type", "Authorization"],
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    );
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(
      helmet({
        crossOriginResourcePolicy: false,
        crossOriginEmbedderPolicy: false,
      })
    );
    this.app.use(morgan("dev"));
    this.app.use(apiLimiter);
  }

  routes() {
    this.app.use(`${this.basePath}/auth`, authRoutes);
    this.app.use(`${this.basePath}/field`, fieldRoutes);
    this.app.use(`${this.basePath}/reservation`, reservationRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default ExpressServer;
