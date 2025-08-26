import Captain from "../models/captain.model.js";

export const createCaptain = async ({ fullname, email, password, vehicle }) => {
  if (
    !fullname?.firstname ||
    !email ||
    !password ||
    !vehicle?.color ||
    !vehicle?.plate ||
    !vehicle?.capacity ||
    !vehicle?.vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const captain = await Captain.create({
    fullname,
    email,
    password,
    vehicle,
  });

  return captain;
};
