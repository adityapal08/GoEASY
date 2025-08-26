import React, { useState } from "react";
import { Link } from "react-router-dom";
const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
    });
    console.log(userData);
    setEmail("");
    setpassword("");
    setFirstName("");
    setLastName("");
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
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's name
          </h3>
          <div className="flex gap-4 mb-5">
            {" "}
            <input
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="
        bg-white w-1/2 px-2 py-2 rounded border text-lg placeholder:text-base"
              type="text"
              placeholder="Firstname"
            />
            <input
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="
        bg-white w-1/2 px-2 py-2 rounded border text-lg placeholder:text-base"
              type="text"
              placeholder="Lastname"
            />
          </div>
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
        bg-white mb-4 px-2 py-2 rounded border w-full text-lg placeholder:text-base"
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
        <p className="text-center mb-5">
          Already have an account?
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
