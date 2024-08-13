import { Router } from "express";
import express from "express";
import { addReservation, listReservations } from "../middlewares/check-validators.js";
import {
  reserveField,
  listReservationsByFieldAndDate,
  userReservations,
} from "./reservation.controller.js";
import { uploadPaymentImage } from "../middlewares/multer-upload.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const router = Router();

router.post(
  "/addReservation",
  uploadPaymentImage.single("payment"),
  addReservation,
  reserveField
);

router.get("/listReservationByName", listReservationsByFieldAndDate);

router.get("/myReservations", listReservations, userReservations)

router.use(
  "/getImage",
  express.static(join(CURRENT_DIR, "../assets/img/payments"))
);

export default router;
