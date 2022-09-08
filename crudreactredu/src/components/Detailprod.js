import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import alertify from "alertifyjs";
import { productselect } from "../features/Productslice";
import Keranjang from "./Keranjang";

const Detailprod = () => {
  const { id } = useParams();
  const dapatprod = useSelector((state) => productselect.selectById(state, id));
  const [quantity, setquantity] = useState(1);
  const navigate = useNavigate();
  const nambah = () => {
    if (quantity < 50) {
      setquantity((quantity) => quantity + 1);
    }
  };
  const kurang = () => {
    if (quantity > 1) {
      setquantity((quantity) => quantity - 1);
    }
  };

  const tambahcart = () => {
    axios
      .post("/api/add-to-cart", {
        product_id: id,
        product_qty: quantity,
      })
      .then((re) => {
        if (re.data.status === 201) {
          alertify.success(re.data.message);
          setquantity(1);
          navigate("/");
        } else if (re.data.status === 409) {
          alertify.error(re.data.error);
        } else if (re.data.status === 404) {
          alertify.error(re.data.error);
        } else if (re.data.status === 401) {
          alertify.error(re.data.error);
        }
      });
  };

  return (
    <>
      <div className="flex justify-center p-5 mt-16">
        <div className="w-9/12 columns-2 border-2 p-2">
          <img
            src={`http://localhost:8000/${dapatprod.image}`}
            className="w-full"
            alt=""
          />
          <div className="py-3">
            <h1 className=" font-bold uppercase text-4xl">{dapatprod.name}</h1>
            <div className="flex gap-3 mt-3">
              {dapatprod.diskon == 1 ? (
                <h5 className="bg-yellow-500 p-2 rounded-lg text-semibold text-[10px] text-white">
                  DISKON
                </h5>
              ) : (
                ""
              )}
              {dapatprod.newarrival == 1 ? (
                <h5 className="bg-yellow-500 p-2 rounded-lg text-semibold text-[10px] text-white">
                  NEW ARRIVAL
                </h5>
              ) : (
                ""
              )}
              {dapatprod.popular == 1 ? (
                <h5 className="bg-yellow-500 p-2 rounded-lg text-semibold text-[10px] text-white">
                  POPULAR
                </h5>
              ) : (
                ""
              )}
            </div>
            <div className="flex my-6 justify-between items-center pr-9">
              <h3 className="font-thin text-[40px]">
                Rp{dapatprod.selling_price}
              </h3>
              <div>
                <h6 className="italic text-[10px]">Buy Price</h6>
                <h3 className="font-thin line-through text-[20px]">
                  Rp {dapatprod.original_price}
                </h3>
              </div>
            </div>
            <div className="flex justify-between items-center pr-9">
              <div>
                <h6 className="italic text-stone-300">Description</h6>
                <h6 className="ml-3 text-2xl">{dapatprod.description}</h6>
              </div>
              <div>
                <h6 className="text-end">Jumlah</h6>
                <div className="flex items-center ">
                  <button
                    onClick={nambah}
                    className="bg-black text-white p-1 rounded-full"
                  >
                    +
                  </button>
                  <div type="text" name="" className=" w-9 p-3 ">
                    {quantity}
                  </div>
                  <button
                    onClick={kurang}
                    className="bg-black text-white p-1 rounded-full"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
            <div className="flex mt-6 justify-between items-center pr-9">
              <div className="my-3">
                <h6 className="italic text-stone-300">Stok</h6>
                <h6 className="ml-3 text-2xl">{dapatprod.qty}</h6>
              </div>
              <div>
                <h6 className="text-end">Total</h6>
                <h6 className="font-semibold text-2xl">
                  {dapatprod.selling_price * quantity}.000
                </h6>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={tambahcart}
                disabled={quantity > dapatprod.qty}
                className="bg-gray-500 mt-3 py-2 px-4 font-semibold text-stone-100 "
              >
                Masukkan Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="transition-all duration-500">
        <Keranjang />
      </div>
    </>
  );
};

export default Detailprod;
