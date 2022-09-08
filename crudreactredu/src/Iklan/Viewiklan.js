import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Homeadmin from "../admin/Homeadmin";
import alertify from "alertifyjs";
function Viewiklan() {
  const [datanya, setdatanya] = useState([]);
  const [error, seterror] = useState("");

  useEffect(() => {
    axios.get("/api/view-iklan").then((res) => {
      if (res.data.status === 200) {
        setdatanya(res.data.iklan);
      } else {
        seterror(res.data.error);
      }
    });
  }, []);

  const hapoos = (id) => {
    axios.delete(`/api/delete-iklan/${id}`).then((res) => {
      if (res.data.status === 200) {
        alertify.success(res.data.message);
      } else {
        seterror(res.data.error);
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Link
        className="w-5/12 bg-slate-500 text-white font-bold text-center py-3"
        to="/"
      >
        Back Home
      </Link>
      <div className=" w-full md:w-9/12 flex gap-3 mt-3">
        <Homeadmin />
        <div className="w-11/12 pb-20">
          <div className=" p-2 md:p-6">
            <h1 className="font-light">View Iklan</h1>
            <table className="w-full">
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Caption</th>
                  <th style={{ width: "60%" }}>Image</th>
                  <th style={{ width: "20%" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {datanya.map((res) => (
                  <tr key={res.id}>
                    <td>{res.caption}</td>
                    <td className="flex justify-center">
                      <img
                        className="w-8/12"
                        src={`http://localhost:8000/${res.image}`}
                        alt=""
                      />
                    </td>
                    <td className="">
                      <button
                        className="bg-red-500 px-5 py-3 text-white font-semibold rounded-full"
                        onClick={() => hapoos(res.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewiklan;
