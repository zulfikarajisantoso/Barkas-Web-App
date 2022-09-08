import React, { useEffect, useState } from "react";
import { keran, opencart } from "../features/Keranjangslice";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { updateqty } from "../features/Cartslice";
import axios from "axios";
import { Link } from "react-router-dom";

function Keranjang() {
  const keranopen = useSelector(keran);
  const dispatch = useDispatch();
  // const cartnya = useSelector(cartselect.selectAll)
  const [data, setdata] = useState([]);

  const keluarkan = () => {
    dispatch(opencart());
  };
  useEffect(() => {
    axios.get(`/api/cart`).then((re) => {
      if (re.data.status === 200) {
        setdata(re.data.carrt);
      }
    });
  }, []);

  const tambah = (cart_id) => {
    setdata((data) =>
      data.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty + (item.product_qty < 50 ? 1 : 0),
            }
          : item
      )
    );
    dispatch(
      updateqty({
        id: cart_id,
        cart_id,
        arit: "inc",
      })
    );
  };

  const kurang = (cart_id) => {
    setdata((data) =>
      data.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    dispatch(
      updateqty({
        id: cart_id,
        cart_id,
        arit: "dec",
      })
    );
  };

  const hapuzcart = (e, cart_id) => {
    e.preventDefault();

    const thisclik = e.currentTarget;
    thisclik.innerText = "Removing";

    axios.delete(`/api/deletecart/${cart_id}`).then((res) => {
      if (res.data.status === 200) {
        thisclik.closest("div").remove();
      } else if (res.data.status === 404) {
        thisclik.innerText = "Remove";
      }
    });
  };

  var totalharga = 0;
  var cart = "";
  if (data.length > 0) {
    cart = (
      <>
        {data?.map((item, idc) => {
          totalharga += item.product?.selling_price * item.product_qty;
          return (
            <div key={idc} className={`flex justify-between items-center mt-3`}>
              <div className=" ">
                <img
                  className="w-14 h-14"
                  src={`http://localhost:8000/${item.product?.image}`}
                  alt=""
                />
                <h6 className="font-semibold text-[11px] text-center mt-1">
                  {item.product?.name}
                </h6>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-center">Jumlah</h4>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => tambah(item.id)}
                    className="bg-stone-900 p-[1px] h-6 w-6 rounded-full text-[14px] text-white"
                  >
                    +
                  </button>
                  <h6 className="text-center mt-1">{item?.product_qty}</h6>
                  <button
                    disabled={item?.product_qty === 1}
                    onClick={() => kurang(item.id)}
                    className="bg-stone-900 p-[1px] h-6 w-6 rounded-full text-[14px] text-white"
                  >
                    -
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold">Total</h4>
                <h6 className="text-center mt-1 text-[13px]">
                  RP {item.product?.selling_price * item.product_qty}.000
                </h6>
              </div>

              <button
                onClick={(e) => hapuzcart(e, item.id)}
                type="button"
                className="text-thin"
              >
                {" "}
                <FaTimes />{" "}
              </button>
            </div>
          );
        })}
      </>
    );
  } else {
    cart = (
      <div className="h-[600px] justify-center flex items-center">
        <h4 className="font-bold text-[19px]">Keranjang Kosong</h4>
      </div>
    );
  }

  return (
    <div
      className={` z-20 transition-all  duration-900 ease-in-out ${
        keranopen ? "opencart" : "ilang"
      } `}
    >
      <div className=" w-full flex justify-end items-end  " onClick={keluarkan}>
        <div
          className={`w-4/12 h-screen z-10 bg-white p-3 transition duration-1000 ease-in-out translate-y-[100px] delay-800 left-0 bottom-0   ${
            keranopen ? "cobaa" : ""
          } `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" py-7 flex justify-between items-center ">
            <div className="flex gap-1 items-center">
              <IoCartSharp className="text-[25px]" />
              <h5 className="text-center font-normal ">Keranjang</h5>
            </div>
            <h6
              onClick={keluarkan}
              className="cursor-pointer text-thin italic text-red-400"
            >
              close
            </h6>
          </div>
          <hr />
          <div className="overflow-y-scroll h-8/12 ">{cart}</div>
          <div className="flex w-11/12 justify-between items-center p-3 mt-3 bottom-0 fixed bg-white">
            <h4 className="font-bold text-5px">Total: Rp {totalharga}.000 </h4>
            <Link
              to="/checkout"
              className="py-1 px-5 text-white  bg-slate-500 font-bold text-5px"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keranjang;
