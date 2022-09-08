import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Registrasi() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [confir, setpassconfir] = useState("");
  const [error, seterror] = useState([]);
  const [cek, setcek] = useState([]);

  const ii = (e) => {
    e.persist();
    setcek({ ...setcek, [e.target.name]: e.target.checked });
  };

  const reg = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: pass,
      password_confirmation: confir,
      role_as: cek.role_as ? "1" : "0",
    };

    console.log(data);
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);

          navigate("/");
        } else {
          seterror(res.data.validation_errors);
        }
      });
    });
  };

  return (
    <div className="w-full h-[100vh] flex bg-stone-300 justify-center items-center">
      <div className="bg-white w-4/12 h-4/6 flex py-10 px-3 flex-col items-center">
        <h1 className="font-bold text-[24px] ">Registrasi</h1>
        <div className="border-b-4 w-7/12  border-stone-700 mb-4 mt-2"></div>
        <div className="flex flex-col gap-3  w-7/12">
          <input
            type="text"
            placeholder="Username"
            className="border-2 border-stone-700 p-2 rounded-sm"
            onChange={(e) => setname(e.target.value)}
          />
          <span className="text-red-600 text-[8px]">{error.name}</span>
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-stone-700 p-2 rounded-sm"
            onChange={(e) => setemail(e.target.value)}
          />
          <span className="text-red-600 text-[8px]">{error.email}</span>
          <input
            type="password"
            className="border-2 border-stone-700 p-2 rounded-sm"
            placeholder="Password"
            onChange={(e) => setpass(e.target.value)}
          />
          <span className="text-red-600 text-[8px]">{error.password}</span>
          <input
            type="password"
            className="border-2 border-stone-700 p-2 rounded-sm"
            placeholder="Password Confirm"
            onChange={(e) => setpassconfir(e.target.value)}
          />
          <span className="text-red-600 text-[8px]">{error.password}</span>
        </div>
        <div className="flex justify-end items-center ">
          <label style={{ fontSize: "9px" }}>Not Required</label>
          <input
            type="checkbox"
            name="role_as"
            style={{
              marginLeft: "2px",
              zIndex: "10",
              backgroudColor: "#000",
              color: "#000",
            }}
            onChange={ii}
            defaultChecked={cek.status === 1 ? true : false}
          />
        </div>

        <button
          type="submit"
          onClick={reg}
          className="mt-4 w-7/12 bg-stone-700 text-white h-10 rounded-sm"
        >
          DAFTAR
        </button>

        <h6 className="text-center text-[13px] mt-6 ">
          Sudah Punya Akun? <a href="login">Masuk</a>
        </h6>
      </div>
    </div>
  );
}

export default Registrasi;
