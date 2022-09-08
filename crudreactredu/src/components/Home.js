import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoBookmarksSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getcart } from "../features/Cartslice";
import { categoriselect, getcat } from "../features/Categoryslice";
import { opencart } from "../features/Keranjangslice";
import { getprod, productselect } from "../features/Productslice";
import iklan1 from "../assets/OIP.jpg";
import iklan2 from "../assets/op.jpg";

import Keranjang from "./Keranjang";

function Home() {
  const dispatch = useDispatch();
  const kalausrol = (e) => {
    if ((e.charCode || e.keycode) === 27) {
      dispatch(opencart());
    }
  };
  const [sort, setsort] = useState("");
  const product = useSelector(productselect.selectAll);
  const category = useSelector(categoriselect.selectAll);
  const [datanya, setdatanya] = useState([]);
  const [newarrival, setnewarrival] = useState("");
  const [diskon, setdiskon] = useState(false);
  const [popular, setpopular] = useState("");

  useEffect(() => {
    dispatch(getcart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getprod());
    dispatch(getcat());
  }, [dispatch]);

  useEffect(() => {
    document.body.addEventListener("keydown", kalausrol);
    return () => {
      document.body.removeEventListener("keydown", kalausrol);
    };
  }, []);

  const number = Number(sort);

  const hapussort = () => {
    setnewarrival("");
    setdiskon(false);
    setpopular("");
  };

  const newarrsort = () => {
    setnewarrival(1);
    setdiskon(false);
    setpopular("");
  };
  const diskonsort = () => {
    setnewarrival("");
    setdiskon(true);
    setpopular("");
  };
  const popularsort = () => {
    setnewarrival("");
    setdiskon(false);
    setpopular(1);
  };
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    axios.get("/api/viewiklan-front").then((res) => {
      if (res.data.status === 200) {
        setdatanya(res.data.iklan);
      }
    });
  }, []);

  return (
    <div className=" transition-all duration-500 mt-16 z-10">
      <div className={`w-full flex flex-col items-center justify-center`}>
        <div className="w-full bg-black flex items-center ">
          <marquee
            behavior=""
            className="font-normal text-gray-300 italic "
            direction="left"
          >
            BELANJA DI ATAS 300K DAPATKAN DISKON SAMPAI 400K. BELANJA DI ATAS
            300K DAPATKAN DISKON SAMPAI 400K. BELANJA DI ATAS 300K DAPATKAN
            DISKON SAMPAI 400K. BELANJA DI ATAS 300K DAPATKAN DISKON SAMPAI
            400K. BELANJA DI ATAS 300K DAPATKAN DISKON SAMPAI 400K.
          </marquee>
        </div>
        <h1 className=" text-center font-bold text-[50px] pt-10 pb-3 mb-10">
          BEKAS BERKUALITAS
        </h1>
        <div className="w-10/12 flex justify-center ">
          <div className="mb-10 text-black w-7/12">
            <Slider {...settings}>
              {datanya.map((res) => (
                <div className="w-full h-80" key={res.id}>
                  <img
                    src={`http://localhost:8000/${res?.image}`}
                    className="w-full h-80  object-fill"
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-4/12 ">
            <img src={iklan1} className="w-full pb-1 pl-1 h-40 object-fill" />
            <img src={iklan2} className="w-full pt-1 pl-1 h-40 object-fill" />
          </div>
        </div>

        <div className="flex gap-2 w-9/12 ">
          <div>
            <h6
              onClick={hapussort}
              className={`text-center text-white bg-red-500 p-2 cursor-pointer duration-900 transition-all opacity-0 -translate-x-10 ${
                newarrival || diskon || popular ? "adakan" : ""
              } `}
            >
              Clear
            </h6>
            <div className="mt-3">
              <h5 className="italic">Category </h5>
              <select
                name=""
                id=""
                onChange={(e) => setsort(e.target.value)}
                className="w-32 border-none my-5 py-1"
              >
                <option value="">Semua</option>
                {category.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h5 className="italic">Sort</h5>
              <div className="flex flex-col">
                <div className="flex ml-3 mt-3">
                  <br />
                  <input
                    type="radio"
                    id="newarrival"
                    name="haha"
                    onClick={newarrsort}
                    value={newarrival}
                  />
                  <label
                    htmlFor="newarrival"
                    className="text-[13px] flex items-center ml-1"
                  >
                    New Arrival
                  </label>
                </div>
                <div className="flex ml-3 mt-3">
                  <br />
                  <input
                    type="radio"
                    id="diskon"
                    name="haha"
                    value={diskon}
                    onClick={diskonsort}
                  />
                  <label
                    htmlFor="diskon"
                    className="text-[13px] flex items-center ml-1"
                  >
                    Diskon
                  </label>
                </div>
                <div className="flex ml-3 mt-3">
                  <br />
                  <input
                    type="radio"
                    id="popular"
                    name="haha"
                    value={popular}
                    onClick={popularsort}
                  />
                  <label
                    htmlFor="popular"
                    className="text-[13px] flex items-center ml-1"
                  >
                    Popular
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 w-full">
            {product
              .filter((item) => {
                if (number == "") {
                  return item;
                } else if (item.category_id === number) {
                  return item;
                }
              })
              .filter((item) => {
                if (item.qty > 0) {
                  return item;
                } else if (item.qty <= 0) {
                  return item.qty > 0;
                }
              })
              .filter((item) => {
                if (diskon === false) {
                  return item;
                } else if (diskon === true) {
                  return item.diskon > 0;
                }
              })
              .filter((item) => {
                if (newarrival == "") {
                  return item;
                } else if (item.newarrival === newarrival) {
                  return item;
                }
              })
              .filter((item) => {
                if (popular == "") {
                  return item;
                } else if (item.popular === popular) {
                  return item;
                }
              })
              .map((item) => (
                <div
                  key={item.id}
                  className="ha w-full p-3 h-[430px] flex flex-col hover:border-2 relative  "
                >
                  <img
                    className="h-18 w-18 items-center img_brang object-cover"
                    src={`http://localhost:8000/${item.image}`}
                    alt=""
                  />
                  <div className=" absolute right-0 top-0 transform ">
                    {item.diskon > 0 && (
                      <div className="relative">
                        <IoBookmarksSharp className="text-yellow-300 text-[50px]" />
                        <h6 className=" text-[13px] text-white absolute top-3 right-4 ">
                          {(item.diskon / item.selling_price) * 100}%
                        </h6>
                      </div>
                    )}
                  </div>
                  <div className=" flex justify-between items-center py-2">
                    <h6 className="">Rp {item.selling_price}</h6>
                    <h6 className="text-[13px] line-through text-stone-500">
                      Rp{item.original_price}
                    </h6>
                  </div>
                  <div className="border-b-2 border-stone-300"></div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold mt-1">{item.brand}</h4>
                    <h6 className="text-[10px]">{item.name}</h6>
                  </div>
                  <Link to={`/detail-product/${item.id}`}>
                    <button className="hidden w-full  py-2 mt-4 font-semibold border-2  duration-300 border-stone-900 hover:bg-stone-900 hover:text-white">
                      DETAIL
                    </button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-center mt-7 w-9/12 h-72">
          <h3 className="font-bold text-[28px] ">Subscribe Newsletter</h3>
          <h6>Stay updated for new collection & special offer</h6>
          <input
            type="text"
            placeholder="MASUKKAN EMAIL KAMU"
            className="mt-4 w-7/12 border-b-2 focus:outline-none border-stone-700 text-center py-3 "
          />
        </div>
      </div>

      <div className="transition-all duration-500">
        <Keranjang />
      </div>
    </div>
  );
}

export default Home;
