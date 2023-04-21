import { Document } from "mongoose";

import { Schema, model } from "mongoose";

export interface IContact extends Document {
  firstname: string;
  lastname: string;
  status: "active|inactive";
}
const contactSchema = new Schema<IContact>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
});
export const Contact = model<IContact>("Contact", contactSchema);
