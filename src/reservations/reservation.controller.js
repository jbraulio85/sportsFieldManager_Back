import Reservation from './reservation.model.js';
import Field from '../fields/field.model.js';

export const reserveField = async (req, res) => {
  const { fieldId, uid, startTime, endTime } = req.body;
  let payment = req.file ? req.file.filename : null;

  try {
    const reservation = new Reservation({
      fieldId,
      uid,
      startTime,
      endTime,
      payment,
      status: "En proceso"
    });

    await reservation.save();

    res.status(201).json({
      msg: "Reserva creada exitosamente",
      reservation
    });
  } catch (e) {
    res.status(500).json({ msg: "Error al procesar la reserva, intente nuevamente", error: e});
  }
};

export const listReservationsByFieldAndDate = async (req, res) => {
  const { fieldName, date } = req.query;

   try {
    const field = await Field.findOne({ fieldName });

    if (!field) {
      return res.status(404).json({ msg: "Campo no encontrado" });
    }

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const reservations = await Reservation.find({
      fieldId: field._id,
      startTime: { $gte: startOfDay, $lt: endOfDay }
    }).populate('uid');

    const formattedReservations = reservations.map(reservation => ({
      reservedBy: `${reservation.uid.name} ${reservation.uid.surname}`,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      status: reservation.status
    }));

    res.status(200).json({
      fieldName: field.fieldName,
      reservations: formattedReservations
    });

  } catch (e) {
    res.status(500).json({ msg: "Error al obtener las reservaciones, intente nuevamente", error: e });
  }
};


export const userReservations = async (req, res) => {
  const uid = req.uid; 

  try {
    const reservations = await Reservation.find({ uid }).populate('fieldId');

    if (!reservations.length) {
      return res.status(404).json({ msg: "No se encontraron reservaciones para este usuario" });
    }

    const formattedReservations = reservations.map(reservation => ({
      fieldName: reservation.fieldId.fieldName,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      status: reservation.status,
    }));

    res.status(200).json({
      msg: "Reservaciones del usuario obtenidas exitosamente",
      reservations: formattedReservations
    });

  } catch (e) {
    res.status(500).json({ msg: "Error al obtener las reservaciones del usuario, intente nuevamente", error: e });
  }
};
