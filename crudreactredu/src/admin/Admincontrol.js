import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";

function Admincontrol({ ...rest }) {
  const [usernya, setusernya] = useState(false);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/checkingauth").then((res) => {
      if (res.status === 200) {
        setusernya(true);
      }
      setloading(false);
    });
    return () => {
      setusernya(false);
    };
  }, []);

  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401) {
        alert(err.response.data.message);
        navigate("/");
      }
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 403) {
        //access denied
        alert(error.response.data.message);
        navigate("/404");
      } else if (error.response.status === 403) {
        //page not found
        alert("403 Error", "Url/page not found", "warning");
        navigate("/403");
      }
      return Promise.reject(error);
    }
  );
  if (loading) return <h1>Loading....</h1>;

  return (
    <Routes>
      <Route
        {...rest}
        render={({ props, location }) =>
          usernya ? (
            <Homepage {...props} />
          ) : (
            <Navigate to={{ pathname: "/login", state: { from: location } }} />
          )
        }
      />
    </Routes>
  );
}

export default Admincontrol;
