import { Router } from "express";
import express from 'express'
import { registerValidator, loginValidator} from "../middlewares/check-validators.js";
import { register, login } from "./auth.controller.js";
import { uploadProfileImage } from "../middlewares/multer-upload.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

const router = Router();

router.post("/register", uploadProfileImage.single("profilePicture"), registerValidator, register);

router.post("/login", loginValidator, login);

router.use(
    "/getProfilePicture",
    express.static(join(CURRENT_DIR, "../assets/img/profiles"))
  );

export default router;