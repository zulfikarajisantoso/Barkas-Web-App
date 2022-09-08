import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categoriselect, getcat } from "../features/Categoryslice";

import Homeadmin from "./Homeadmin";

function Add() {
  const dispatch = useDispatch();
  const produt = useSelector(categoriselect.selectAll);

  useEffect(() => {
    dispatch(getcat());
  }, []);

  const imagaref = useRef(null);
  const [kategori, setkategori] = useState("");
  const [namabrng, setnamabrng] = useState("");
  const [brand, setbrand] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [qty, setqty] = useState("");
  const [selling_price, setselling_price] = useState("");
  const [original_price, setoriginal_price] = useState("");

  const [diskon, setdiskon] = useState("");
  const [load, setloadig] = useState(null);
  const [select, setselect] = useState([]);
  const [checkbox, setcheckbox] = useState({
    newarrifal: "",
    popular: "",
  });
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  const addfileimage = (e) => {
    e.persist();
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (e) => {
      setloadig(e.target.result);
    };

    setselect({ image: e.target.files[0] });
  };
  const rubahloading = () => {
    setselect([]);
    setloadig(null);
  };

  const ubahcheck = (e) => {
    e.persist();
    setcheckbox({ ...checkbox, [e.target.name]: e.target.checked });
  };

  const upload = async (e) => {
    e.preventDefault();

    setloading(true);
    const formdata = new FormData();
    formdata.append("image", select.image);
    formdata.append("category_id", kategori);
    formdata.append("name", namabrng);
    formdata.append("description", deskripsi);
    formdata.append("selling_price", selling_price);
    formdata.append("original_price", original_price);
    formdata.append("qty", qty);
    formdata.append("brand", brand);
    formdata.append("newarrival", checkbox.newarrifal);
    formdata.append("popular", checkbox.popular);
    formdata.append("diskon", diskon);

    //  dispatch(addproduct({

    //   category_id : kategori,
    //   name : namabrng,
    //   description : deskripsi,
    //   brand : brand,
    //   selling_price: selling_price,
    //   original_price: original_price,
    //   image : select,
    //   qty : qty,
    //   newarrival : checkbox.newarrifal,
    //   popular: checkbox.popular,
    //   diskon : checkbox.diskon
    // }))
    axios.post("/api/store-product", formdata).then((res) => {
      if (res.data.status == 200) {
        setkategori("");
        setnamabrng("");
        setbrand("");
        setdeskripsi("");
        setqty("");
        setselling_price("");
        setoriginal_price("");
        setselect([]);
        setloadig(null);
        setcheckbox({
          ...setcheckbox,
          newarrifal: "",
          popular: "",
        });
        setdiskon("");
        setloading(false);
      } else {
        seterror(res.data.errors);
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
            <h1 className="font-light">Tambah Barang</h1>

            <h6 className="text-[13px] text-red-500 my-3">{error.image}</h6>

            <div className="grid  md:grid-cols-2 gap-3">
              <div>
                <select
                  name="category_id"
                  onChange={(e) => setkategori(e.target.value)}
                  value={kategori}
                  className="focus:outline-none border-b-2 w-full border-x-2 p-3 "
                >
                  <option>Kategori</option>
                  {produt.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {error.category_id && (
                  <h6 className="text-[13px] text-red-500 my-3">
                    *{error.category_id}
                  </h6>
                )}
              </div>
              <div className="w-full">
                <input
                  className="border-b-2 w-full border-x-2 p-3 focus:outline-none"
                  type="text"
                  value={namabrng}
                  onChange={(e) => setnamabrng(e.target.value)}
                  placeholder="Nama Barang"
                />

                {error.name && (
                  <h6 className="text-[13px] text-red-500 my-3">
                    *{error.name}
                  </h6>
                )}
              </div>
            </div>
            <div className="grid  md:grid-cols-2 mt-6 gap-3">
              <div>
                <input
                  className="border-b-2 border-x-2 p-3 w-full focus:outline-none"
                  type="text"
                  value={brand}
                  onChange={(e) => setbrand(e.target.value)}
                  placeholder="Brand"
                />
                {error.brand && (
                  <h6 className="text-[13px] text-red-500 my-3">
                    *{error.brand}
                  </h6>
                )}
              </div>
              <div>
                <input
                  className="border-b-2 border-x-2 w-full p-3 focus:outline-none"
                  type="text"
                  value={qty}
                  onChange={(e) => setqty(e.target.value)}
                  placeholder="Jumlah"
                />
                {error.brand && (
                  <h6 className="text-[13px] text-red-500 my-3">
                    *{error.brand}
                  </h6>
                )}
              </div>
            </div>
            <div className="grid  md:grid-cols-1 gap-3 mt-6">
              <input
                className="border-b-2 border-x-2 p-3 focus:outline-none"
                type="text"
                value={deskripsi}
                onChange={(e) => setdeskripsi(e.target.value)}
                placeholder="Deskripsi"
              />
            </div>

            <div className="grid  md:grid-cols-2 gap-3 mt-6">
              <div>
                <input
                  className="border-b-2 border-x-2 p-3 w-full  focus:outline-none"
                  type="number"
                  value={original_price}
                  onChange={(e) => setoriginal_price(e.target.value)}
                  placeholder="Harga Asli"
                />
              </div>
              <div>
                <input
                  className="border-b-2 border-x-2 p-3 w-full focus:outline-none"
                  type="number"
                  value={selling_price}
                  onChange={(e) => setselling_price(e.target.value)}
                  placeholder="Harga Jual"
                />

                {error.selling_price && (
                  <h6 className="text-[13px] text-red-500 my-3">
                    *{error.selling_price}
                  </h6>
                )}
              </div>
            </div>
            <div className="grid  md:grid-cols-3 justify-center gap-3 mt-6">
              <div className="flex flex-col items-center">
                <label>New Arrival </label>
                <input
                  type="checkbox"
                  name="newarrifal"
                  onChange={ubahcheck}
                  checked={checkbox.newarrifal ? true : false}
                  className="h-50 w-50"
                />
              </div>
              <div className=" flex flex-col items-center">
                <label>Popular </label>
                <input
                  type="checkbox"
                  name="popular"
                  onChange={ubahcheck}
                  checked={checkbox.popular ? true : false}
                  className="h-50 w-50"
                />
              </div>
              <div className=" flex flex-col items-center">
                <label>Diskon </label>
                <input
                  type="number"
                  name="diskon"
                  value={diskon}
                  onChange={(e) => setdiskon(e.target.value)}
                  className="h-50 w-50 border-2"
                />
              </div>
            </div>
            <div className=" gap-3 mt-6 flex flex-col items-center">
              <input
                ref={imagaref}
                onChange={addfileimage}
                className="border-b-2 border-x-2 p-3 focus:outline-none"
                type="file"
                name="image"
                hidden
              />

              <img src={load} alt="" className="w-72 object-contain" />

              {load ? (
                <div
                  onClick={rubahloading}
                  className=" cursor-pointer flex gap-3 bg-stone-800 text-white font-bold h-10 p-5 items-center justify-center"
                >
                  <FaTimes />
                </div>
              ) : (
                <div
                  onClick={() => imagaref.current.click()}
                  className=" cursor-pointer flex gap-3 bg-stone-800 text-white font-bold h-10 p-5 items-center justify-center"
                >
                  <h5>Masukkan Gambar</h5>
                  <AiFillCamera />
                </div>
              )}
            </div>
            {load && (
              <div className="w-full flex justify-center mt-3  ">
                <button
                  onClick={upload}
                  type="submit"
                  className="h-10 bg-slate-400 text-white font-semibold w-8/12 md:w-5/12 p-3 flex items-center justify-center "
                >
                  {loading ? "Menambahkan..." : "Tambah Barang"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
