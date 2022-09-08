import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Homeadmin from "../admin/Homeadmin";

function Addiklan() {
  const imageref = useRef(null);
  const [loaded, setloaded] = useState(null);
  const [select, setselect] = useState([]);
  const [error, seterror] = useState("");
  const [caption, setcaption] = useState("");

  const rubahgambar = (e) => {
    e.persist();
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (e) => {
      setloaded(e.target.result);
    };
    setselect({ image: e.target.files[0] });
  };
  const reject = () => {
    setloaded(null);
    setselect([]);
  };

  const kirim = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", select.image);
    data.append("caption", caption);

    await axios.post(`/api/add-iklan`, data).then((res) => {
      if (res.data.status === 200) {
        setloaded(null);
        setcaption("");
        setselect([]);
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
            <h1 className="font-light">Add Iklan</h1>

            <div className="my-4 flex flex-col items-center">
              <label className="font-bold text-center text-[15px] mb-3">
                Caption
              </label>
              <input
                value={caption}
                onChange={(e) => setcaption(e.target.value)}
                type="text"
                className=" border-x-2 border-b-2 outline-none w-6/12 p-3 h-6"
              />
              <span>{error?.caption}</span>
            </div>
            <div className="flex flex-col items-center">
              <label className="font-bold text-center text-[15px] mb-3">
                Image
              </label>

              <input
                type="file"
                ref={imageref}
                onChange={rubahgambar}
                className=""
                name="image"
                hidden
              />
              <img src={loaded} alt="" />

              {loaded ? (
                <div className="mt-10 space-x-4" onClick={reject}>
                  <button
                    type="submit"
                    onClick={kirim}
                    className="py-3 px-5 text-semibold bg-green-300"
                  >
                    Tambah
                  </button>
                  <button className="py-3 px-5 text-semibold bg-red-300">
                    Batal
                  </button>
                </div>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => imageref.current.click()}
                >
                  <h4>Masukkkan Gambar</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addiklan;
