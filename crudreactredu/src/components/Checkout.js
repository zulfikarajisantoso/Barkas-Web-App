import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";

function Checkout() {
  const [datanya, setdatanya] = useState([]);
  const [namalengkap, setnamalengkap] = useState("");
  const [email, setemail] = useState("");
  const [nohp, setnohp] = useState("");
  const [kodepos, setkodepos] = useState("");
  const [alamat, setalamat] = useState("");
  const [error, seterror] = useState("");
  var totalbayar = 0;
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/cart`).then((re) => {
      if (re.data.status === 200) {
        setdatanya(re.data.carrt);
      }
    });
  }, []);

  // const bayar = async () => {
  //   const orderdata = {
  //     namalengkap: namalengkap,
  //     email: email,
  //     nohp: nohp,
  //     alamat: alamat,
  //     kodepos: kodepos,
  //     totalbayar: totalbayar,
  //   };

  //   await axios.post(`/api/orderplace`, orderdata).then((res) => {
  //     if (res.data.status === 200) {
  //       alertify.success(res.data.message);
  //       navigate("/thankyou");
  //     } else if (res.data.status === 422) {
  //       seterror(res.data.error);
  //     } else {
  //       alertify.error(res.data.error);
  //     }
  //   });
  // };

  const bayar = () => {
    const orderdata = {
      namalengkap: namalengkap,
      email: email,
      nohp: nohp,
      alamat: alamat,
      kodepos: kodepos,
      totalbayar: totalbayar,
    };
    axios.post("/api/orderplace", orderdata);

    axios.get("/api/orderplace").then((res) => {
      window.snap.pay(res.data.snaptoken);
    });
  };

  var totalharga = 0;
  let totaldiskon = 0;

  return (
    <div className="flex justify-center">
      <div className="w-10/12 grid grid-cols-2 pt-12 ">
        <div className="px-3 space-y-4">
          <h3 className="bg-blue-900 p-3 text-center text-white font-bold ">
            Informasi Pembeli
          </h3>
          <div>
            <input
              type="text"
              className="w-full border-b-2 outline-none p-2"
              placeholder="Nama Lengkap Anda"
              value={namalengkap}
              onChange={(e) => setnamalengkap(e.target.value)}
            />
            <span className="text-red-500 text-[8px]">{error.namalengkap}</span>
          </div>
          <div>
            <input
              type="text"
              className="w-full border-b-2 outline-none p-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <span className="text-red-500 text-[8px]">{error.email}</span>
          </div>
          <div>
            <input
              type="number"
              className="w-full border-b-2 outline-none p-2"
              placeholder="No Handphone"
              value={nohp}
              onChange={(e) => setnohp(e.target.value)}
            />
            <span className="text-red-500 text-[8px]">{error.nohp}</span>
          </div>
          <div>
            <input
              type="number"
              className="w-full border-b-2 outline-none p-2"
              placeholder="Kode Pos"
              value={kodepos}
              onChange={(e) => setkodepos(e.target.value)}
            />
            <span className="text-red-500 text-[8px]">{error.kodepos}</span>
          </div>
          <div>
            <textarea
              type="text"
              className="w-full border-b-2 outline-none p-2"
              placeholder="Alamat Lengkap"
              value={alamat}
              onChange={(e) => setalamat(e.target.value)}
            />
            <span className="text-red-500 text-[8px]">{error.alamat}</span>
          </div>
        </div>
        <div>
          <h1 className="bg-blue-900 p-3 text-center text-white font-bold ">
            Pesanan Anda
          </h1>
          <div className="flex p-3 justify-between font-bold">
            <h6>Name Product </h6>
            <h6>Jumlah</h6>
            <h6>Total</h6>
          </div>
          {datanya.map((item) => {
            totalharga += item.product?.selling_price * item.product_qty;
            totaldiskon += Math.floor(item.product?.diskon);
            totalbayar = totalharga - totaldiskon;
            return (
              <div key={item.id} className="flex p-3 justify-between ">
                <h6>{item.product.name}</h6>
                <h6>{item.product_qty}</h6>
                <h6>Rp{item.product.selling_price * item.product_qty}.000</h6>
              </div>
            );
          })}
          <div className="flex justify-end flex-col space-y-2">
            <h6 className=" font-normal text-end text-[13px]">
              Total Diskon : - Rp{totaldiskon}.000
            </h6>
            <h5 className="font-bold text-end">
              Total Bayar : Rp{totalbayar}.000
            </h5>
            <button className="bg-yellow-400 p-3" onClick={bayar}>
              Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
