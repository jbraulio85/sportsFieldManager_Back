"use strict";

import mongoose from "mongoose";

const fieldSchema = mongoose.Schema(
  {
    fieldName: {
      type: String,
    },
    fieldType: {
      type: String,
    },
    capacity: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Fields", fieldSchema);

