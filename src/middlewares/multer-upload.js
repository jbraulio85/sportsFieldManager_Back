import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ["image/jpeg", "image/png"];

export const uploadFieldImage = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, "../assets/img/fields"),
    filename: (req, file, cb) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];

      cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Only ${MIMETYPES.join(" ")} mimetypes are allowed`));
  },
  limits: {
    fieldSize: 10000000,
  },
});

export const uploadPaymentdImage = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, "../assets/img/payments"),
    filename: (req, file, cb) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];

      cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Only ${MIMETYPES.join(" ")} mimetypes are allowed`));
  },
  limits: {
    fieldSize: 10000000,
  },
});

export const uploadProfileImage = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, "../assets/img/profiles"),
    filename: (req, file, cb) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];

      cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Only ${MIMETYPES.join(" ")} mimetypes are allowed`));
  },
  limits: {
    fieldSize: 10000000,
  },
});

