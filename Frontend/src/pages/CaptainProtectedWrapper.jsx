import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
    axios
      .get(`http://localhost:4000/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setCaptain(response.data.captain);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token]);

  if (loading) {
    return <div>loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
