import { Router } from "express";
import express from "express";
import { addField, listFields } from "./field.controller.js";
import { addFieldValidator } from "../middlewares/check-validators.js";
import { uploadFieldImage } from "../middlewares/multer-upload.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const router = Router();

router.post(
  "/addField",
  uploadFieldImage.single("photo"),
  addFieldValidator,
  addField
);

router.get("/getFields", listFields);

router.use(
    "/getFieldImg",
    express.static(join(CURRENT_DIR, "../assets/img/fields"))
  );

export default router;
