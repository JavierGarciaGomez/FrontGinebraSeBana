import { model, Schema, ObjectId } from "mongoose";
import { IPet } from "../interfaces/interfaces";

const petSchema = new Schema<IPet>({
  petName: { type: String, required: true, trim: true },
  bathPeriodicity: { type: Number, required: true },
  isPublic: Boolean,
  shampoos: [String],
  bathTypes: [String],
  linkedUsers: [
    {
      linkedUser: { type: Schema.Types.ObjectId, ref: "User" },
      viewAuthorization: Boolean,
      editAuthorization: Boolean,
      creator: Boolean,
    },
  ],
  registeredBaths: [
    {
      date: Date,
      bather: { username: String, imgUrl: String },
      shampoos: [String],
      bathTypes: String,
    },
  ],
});

export const Pet = model<IPet>("Pet", petSchema);