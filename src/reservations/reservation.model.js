"use strict";

import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    fieldId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fields",
      required: true,
    },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    payment:{
      type: String,
    },
    status: {
      type: String,
      enum: ["En proceso", "Reservado", "Cancelado"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Reservations", reservationSchema);
