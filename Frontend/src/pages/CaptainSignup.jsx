import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const navigate = useNavigate();

  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email,
      password,
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity), // ✅ convert to number
        vehicleType: vehicleType,
      },
    };

    console.log("Sending data:", captainData);

    try {
      const response = await axios.post(
        `http://localhost:4000/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.log("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed!");
    }

    // Reset form fields
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleCapacity("");
    setVehicleColor("");
    setVehicleType("");
    setVehiclePlate("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's name
          </h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white w-1/2 px-2 py-2 rounded border text-lg placeholder:text-base"
              type="text"
              placeholder="Firstname"
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white w-1/2 px-2 py-2 rounded border text-lg placeholder:text-base"
              type="text"
              placeholder="Lastname"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white mb-7 px-2 py-2 rounded border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white mb-4 px-2 py-2 rounded border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold mb-7 px-2 py-2 rounded border w-full text-lg">
            Create Captain Account
          </button>
        </form>

        <p className="text-center mb-5">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-500">
            Login Here
          </Link>
        </p>
      </div>

      <div className="mb-6">
        <p className="text-xs">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy</span> and the{" "}
          <span className="underline">Terms of Service apply</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
