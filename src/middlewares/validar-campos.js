import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
  const e = validationResult(req);
  if (!e.isEmpty()) {
    return res.status(400).json(e);
  }

  next();
};
