import { model, Schema } from "mongoose";

import { IUser } from "../interfaces/interfaces";

const userSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: String,
  role: {
    type: String,
    default: "user",
  },
  creationDate: {
    type: Date,
    default: new Date(),
  },
  // linkedPets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],

  linkedPets: [
    {
      linkedPet: { type: Schema.Types.ObjectId, ref: "Pet" },
      viewAuthorization: Boolean,
      editAuthorization: Boolean,
      creator: Boolean,
    },
  ],
});

// userSchema.pre<IUser>("save", async function (next) {
//   const user = this;

//   if (!user.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(user.password, salt);
//   user.password = hash;

//   next();
// });

// userSchema.methods.comparePassword = async function (
//   password: string
// ): Promise<Boolean> {
//   return await bcrypt.compare(password, this.password);
// };

export const User = model<IUser>("User", userSchema);
