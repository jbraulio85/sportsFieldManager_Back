import { check } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import {
  existeEmail,
  validateReservationData,
} from "../helpers/db-validators.js";
import { validateJWT } from "./validar-jwt.js";

export const registerValidator = [
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("surname", "El apellido es obligatorio").not().isEmpty(),
  check("email", "El correo electrónico").isEmail(),
  check("email").custom(existeEmail),
  check("password", "El password debe de ser mayor a 6 caracteres").isLength({
    min: 6,
  }),
  validarCampos,
];

export const loginValidator = [
  check("email")
    .optional()
    .isEmail()
    .withMessage("Ingrese una dirección válida"),
  check("username").optional().isString().withMessage("Username inválido"),
  check("password", "Password debe de tener al menos 6 caracteres").isLength({
    min: 6,
  }),
  validarCampos,
];

export const addFieldValidator = [
  check("fieldName", "El nombre de la cancha es obligatorio").not().isEmpty(),
  validarCampos,
];

export const addReservation = [
  validateJWT,
  check("startTime", "La hora de inicio es obligatoria").not().isEmpty(),
  check("endTime", "La hora de finalización es obligatoria").not().isEmpty(),
  check("fieldId", "Es necesario que seleccione una cancha").not().isEmpty(),
  check("uid", "No se puede reservar una cancha si no está logueado")
    .not()
    .isEmpty(),
  validarCampos,
  validateReservationData,
];

export const listReservations = [
  validateJWT,
  check('uid', "El id usuario es obligatorio").not().isEmpty(),
  validarCampos
]