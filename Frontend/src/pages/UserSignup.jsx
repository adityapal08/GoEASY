import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
      fullname: { firstname: firstName, lastname: lastName },
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user); // update context
        navigate("/login");

        // reset fields
        setEmail("");
        setpassword("");
        setFirstName("");
        setLastName("");
      }
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed. Try again.");
    }
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
          <h3 className="text-lg font-medium mb-2">What's our name</h3>
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
            Create Account
          </button>
        </form>
        <p className="text-center mb-5">
          Already have an account?
          <Link to="/login" className="text-blue-500">
            Login Here
          </Link>
        </p>
      </div>
      <div className="mb-6">
        <p className="text-xs">
          By proceeding,you consent to get calls,WhatApp or SMS
          messages,including by automated means ,from GoEASY and its affiliates
          to number provided
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
