import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
//import UserLogin from "./pages/userLogin.jsx";
import UserSignup from "./pages/userSignup.jsx";
import CaptainLogin from "./pages/captainLogin.jsx";
import CaptainSignup from "./pages/captainSignup.jsx";
import MainHome from "./pages/MainHome.jsx";
import UserProtectedWrapper from "./pages/UserProtectedWrapper.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserLogout from "./pages/UserLogout.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <MainHome />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path="/captain-logout"
          element={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
