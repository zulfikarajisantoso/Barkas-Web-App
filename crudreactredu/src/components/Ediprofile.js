import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
function Ediprofile() {
  const [datauser, setdapat] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [role_as, setrole_as] = useState("");
  const [imgnya, setimgnya] = useState(null);
  const [load, setload] = useState(null);
  const imgref = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/getuser").then((res) => {
      if (res.data.status === 200) {
        setdapat(res.data.user);
        setname(res.data.user.name);
        setemail(res.data.user.email);
        setrole_as(res.data.user.role_as);
        setimgnya(res.data.user.image);
      }
    });
  }, []);

  const gambarubah = (e) => {
    e.persist();
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (e) => {
      setload(e.target.result);
    };

    setimgnya({ image: e.target.files[0] });
  };

  const abort = () => {
    setload(null);
    setimgnya(null);
  };

  const simpan = (id) => {
    const useredit = new FormData();
    useredit.append("name", name);
    useredit.append("email", email);
    useredit.append("role_as", role_as ? "1" : "0");
    useredit.append("image", imgnya.image);

    axios.post(`/api/editprofile/${id}`, useredit).then((res) => {
      if (res.data.status === 200) {
        alertify.success(res.data.message);
        navigate("/");
      }
    });
  };

  return (
    <div className="  flex justify-center">
      <div className="pt-20 pb-7 w-5/12 bg-stone-100 flex flex-col items-center gap-4">
        <h1 className=" font-bold text-[30px]">Edit Profile</h1>
        <div className="w-7/12">
          <input
            className="w-full p-2 py-3 border-b-2 outline-none border-x-2"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="w-7/12">
          <input
            className="w-full p-2 py-3 border-b-2 outline-none border-x-2"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="w-7/12 flex gap-2">
          <h6 className="font-semibold"> Admin : </h6>
          <input
            type="checkbox"
            name="role_as"
            checked={role_as == 1 ? true : false}
            onChange={(e) => setrole_as(e.target.checked)}
          />
        </div>
        <div className="w-7/12 flex flex-col items-center">
          {load ? (
            <img src={load} alt="tidak ada" className="w-full" />
          ) : (
            <img src={`http://localhost:8000/${imgnya}`} alt="Tidak ada img" />
          )}
          <div>
            <input type="file" ref={imgref} onChange={gambarubah} hidden />
          </div>

          {load ? (
            <div className=" flex justify-center">
              <button
                onClick={abort}
                className="mt-2 text-white font-semibold rounded-sm py-2 px-5 bg-red-400"
              >
                X
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                className="mt-2 text-white font-semibold rounded-sm py-2 px-5 bg-slate-400"
                onClick={() => imgref.current.click()}
              >
                Ganti Gambar
              </button>
            </div>
          )}
        </div>
        <div className="w-7/12 mt-4 ">
          <button
            type="submit"
            onClick={() => simpan(datauser.id)}
            className="bg-black w-full py-3 rounded-lg text-white font-bold"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ediprofile;
