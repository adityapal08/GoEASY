import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be atleast 3 characters"],
    },
    lastname: {
      type: String,
      //required: true,
      minlength: [3, "Last name must be atleast 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //minlength: [5, "Email must be atleast 5 characters"],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "please enter valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be atleast 3 char long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be atleast 3 char long"],
    },
    capacity: {
      type: String,
      required: true,
      min: [1, "capacity must be atleast 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["Car", "Bike", "Auto"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: { type: Number },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const Captain = mongoose.model("Captain", captainSchema);
export default Captain;
