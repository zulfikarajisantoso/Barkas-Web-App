import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Edit from "./admin/Edit";
import Footer from "./components/Footer";
import axios from "axios";
import Home from "./components/Home";
import Login from "./components/Login";
import Registrasi from "./components/Registrasi";
import Add from "./admin/Add";
import View from "./admin/View";
import Addcat from "./admin/category/Addcat";
import Viewcat from "./admin/category/Viewcat";
import Editcat from "./admin/category/Editcat";
import Detailprod from "./components/Detailprod";
import Navbar from "./components/Navbar";
import Checkout from "./components/Checkout";
import Thankyou from "./components/Thankyou";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Addiklan from "./Iklan/Addiklan";
import Viewiklan from "./Iklan/Viewiklan";
import Ediprofile from "./components/Ediprofile";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
});

function App() {
  const [user, setuser] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get("/api/checkingauth").then((res) => {
      if (res.status === 200) {
        setuser(true);
      }
      setloading(false);
    });
    return () => {
      setuser(false);
    };
  }, []);

  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401) {
        // alert(err.response.data.message);s
        // navigate("/");
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
        // alert(error.response.data.message);
        // navigate("/404");
      } else if (error.response.status === 403) {
        //page not found
        // alert("403 Error", "Url/page not found", "warning");
        // navigate("/403");
      }
      return Promise.reject(error);
    }
  );

  console.log(user);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            localStorage.getItem("auth_token") ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="/regis"
          element={
            localStorage.getItem("auth_token") ? (
              <Navigate to="/" />
            ) : (
              <Registrasi />
            )
          }
        />

        <Route path="/editprofile/:id" element={<Ediprofile />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/checkout" exact element={<Checkout />} />
        <Route path="/detail-product/:id" exact element={<Detailprod />} />
        <Route path="/admin" exact element={user && <View />} />
        <Route
          path="/admin/add"
          element={user ? <Add /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/edit/:id"
          element={user ? <Edit /> : <Navigate to="/" />}
        />
        <Route path="/admin/add-category" element={<Addcat />} />
        <Route path="/admin/view-category" element={<Viewcat />} />
        <Route path="/admin/edit-category/:id" element={<Editcat />} />
        <Route path="/admin/add-iklan" element={<Addiklan />} />
        <Route path="/admin/view-iklan" element={<Viewiklan />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
