import User from '../users/user.model.js'
import mongoose from 'mongoose';
import Field from '../fields/field.model.js';
import Reservation from '../reservations/reservation.model.js';

export const existeEmail = async (email = '') => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado`)
    }
}

export const validateReservationData = async (req, res, next) => {
    const { fieldId, uid, startTime, endTime } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(fieldId) || !mongoose.Types.ObjectId.isValid(uid)) {
      return res.status(400).json({ msg: "Campo o usuario no válido" });
    }
  
    try {
      const field = await Field.findById(fieldId);
      if (!field) {
        return res.status(404).json({ msg: "Campo no encontrado" });
      }
  
      const user = await User.findById(uid);
      if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }
  
      const existingReservations = await Reservation.find({
        fieldId,
        $or: [
          { startTime: { $lt: endTime, $gte: startTime } },
          { endTime: { $gt: startTime, $lte: endTime } },
          { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
        ]
      });
  
      if (existingReservations.length > 0) {
        return res.status(400).json({ msg: "El campo no está disponible en el horario solicitado" });
      }
  
      next(); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al validar los datos de la reserva, intente nuevamente" });
    }
  };