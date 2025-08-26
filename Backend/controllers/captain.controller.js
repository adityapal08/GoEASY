import { validationResult } from "express-validator";
import Captain from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";

export const registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // check if already exists
    const isCaptainAlreadyExist = await Captain.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    // hash password
    const hashedPassword = await Captain.hashPassword(password);

    // create captain (with proper nested structure)
    const captain = await createCaptain({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      },
    });

    // generate JWT token
    const token = captain.generateAuthToken();

    res.status(201).json({ success: true, token, captain });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const loginCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email and password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email and password" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);
    res.status(200).json({ token, captain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

export const getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

export const logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await BlacklistToken.create({ token });
  res.status(200).json({ message: "Logged out" });
};
