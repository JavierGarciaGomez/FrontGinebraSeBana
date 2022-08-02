import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  fullName: string;
  linkedPets: any;
  //   comparePassword: (password: string) => Promise<Boolean>;
}

const userSchema = new Schema({
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
  // linkedPets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],

  linkedPets: [
    {
      linkedPet: { type: Schema.Types.ObjectId, ref: "Pet" },
      viewAuthorization: Boolean,
      editAuthorization: Boolean,
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

export default model<IUser>("User", userSchema);
