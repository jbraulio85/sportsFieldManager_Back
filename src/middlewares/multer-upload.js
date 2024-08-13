import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import { extname } from "path"; // Asegúrate de importar extname correctamente

// Configuración de Cloudinary
cloudinary.v2.config({
  cloud_name: 'dcrgnm3ud',
  api_key: '655453188429764',
  api_secret: '7DJJn3dB1hGQNAYYY0xM81Xr05M',
});

// Configurar el almacenamiento en Cloudinary para imágenes de campos
const fieldImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'fields',
    public_id: (req, file) => {
      const fileExtension = extname(file.originalname); // extname ahora está definido
      const fileName = file.originalname.split(fileExtension)[0];
      return `${fileName}-${Date.now()}`; // Nombre del archivo en Cloudinary
    },
  },
});

export const uploadFieldImage = multer({
  storage: fieldImageStorage,
  fileFilter: (req, file, cb) => {
    cb(null, true); // Permitir cualquier formato de imagen
  },
  limits: {
    fileSize: 10000000, // 10MB
  },
});

// Configurar el almacenamiento en Cloudinary para imágenes de pagos
const paymentImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'payments',
    public_id: (req, file) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];
      return `${fileName}-${Date.now()}`;
    },
  },
});

export const uploadPaymentImage = multer({
  storage: paymentImageStorage,
  fileFilter: (req, file, cb) => {
    cb(null, true); // Permitir cualquier formato de imagen
  },
  limits: {
    fileSize: 10000000,
  },
});

// Configurar el almacenamiento en Cloudinary para imágenes de perfiles
const profileImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'profiles',
    public_id: (req, file) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];
      return `${fileName}-${Date.now()}`;
    },
  },
});

export const uploadProfileImage = multer({
  storage: profileImageStorage,
  fileFilter: (req, file, cb) => {
    cb(null, true); // Permitir cualquier formato de imagen
  },
  limits: {
    fileSize: 10000000,
  },
});
