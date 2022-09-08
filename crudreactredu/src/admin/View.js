import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getprod, productselect } from "../features/Productslice";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Homeadmin from "./Homeadmin";
import axios from "axios";
import alertify from "alertifyjs";

function View() {
  const dispatch = useDispatch();
  const produt = useSelector(productselect.selectAll);

  useEffect(() => {
    dispatch(getprod());
  }, [dispatch]);

  const hapo = (id) => {
    axios.delete(`/api/deleteprod/${id}`).then((res) => {
      if (res.data.status === 200) {
        alertify.success(res.data.message);

        window.location.reload();
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
        <div className="overflow-x-auto md:overflow-hidden w-full">
          <table>
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Harga</th>
                <th>Merek</th>
                <th>Deskripsi</th>
                <th>Gambar</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produt.map((haha) => (
                <tr key={haha.id} className="mb-4">
                  <td className="text-center">{haha.name}</td>
                  <td className="text-center">Rp {haha.selling_price}</td>
                  <td className="text-center">{haha.brand}</td>
                  <td className="text-center">{haha.description}</td>
                  <td className="">
                    <img
                      src={`http://localhost:8000/${haha.image}`}
                      className="w-32 p-1"
                      alt=""
                    />
                  </td>
                  <td className="flex items-center gap-3 justify-center mt-3 ml-3 ">
                    <Link
                      to={`/admin/edit/${haha.id}`}
                      className="bg-yellow-600 text-[13px] text-center font-semibold  text-white px-4 py-2 "
                    >
                      Edit
                    </Link>
                    <button onClick={() => hapo(haha.id)}>
                      <FaTimesCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {produt.isLoading && (
            <h1 className="text-center font-bold py-10">Loading..</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
