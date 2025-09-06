import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  //const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await axios.post(
        "http://localhost:4000/users/login",
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setEmail("");
      setpassword("");
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
          New Here?
          <Link to="/signup" className="text-blue-500">
            Create new account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="
        bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 px-2 py-2 rounded border w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
