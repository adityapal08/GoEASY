import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";
const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  // const [captainData, setCaptainData] = useState({});
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = { email: email, password: password };
    const response = await axios.post(
      `http://localhost:4000/captains/login`,
      captain
    );
    if (response.status == 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    console.log(captain);
    setEmail("");
    setpassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="
        bg-white mb-7 px-2 py-2 rounded border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="
        bg-white mb-7 px-2 py-2 rounded border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button
            className="
        bg-[#111] text-white font-semibold mb-7 px-2 py-2 rounded border w-full text-lg placeholder:text-base"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet?
          <Link to="/captain-signup" className="text-blue-500">
            Register as a captain
          </Link>
        </p>
      </div>
      <div className="mt-5">
        <Link
          to="/login"
          className="
        bg-[#f3c164] flex items-center justify-center text-white font-semibold mb-7 px-2 py-2 rounded border w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
