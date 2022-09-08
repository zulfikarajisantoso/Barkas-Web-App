import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiCaretDown } from "react-icons/bi";

function Homeadmin() {
  const [dropdrop, setdropdrop] = useState(false);
  const [prod, setprod] = useState(false);
  const [iklan, setiklan] = useState(false);

  return (
    <div className="flex flex-col items-center border-r-4 w-3/12">
      <img
        src="https://st2.depositphotos.com/6489488/9384/v/600/depositphotos_93842998-stock-illustration-space-rocket-startup-icon.jpg"
        alt=""
      />
      <div className=" space-y-3 ">
        <div
          onClick={() => setprod(!prod)}
          className="cursor-pointer z-10  hover:text-white font-semibold hover:bg-stone-500 transition-all duration-300 w-full py-3 px-7  flex items-center gap-3 "
        >
          <h6>Product</h6>
          <BiCaretDown />
        </div>

        <div
          className={`flex-col transition-all duration-600 ease-in-out  hidden -translate-y-5   ${
            prod ? "dropside" : ""
          } `}
        >
          <Link
            to="/admin"
            className="cursor-pointer text-[10px]  hover:text-white font-semibold hover:bg-stone-500 transition-all duration-300 w-full py-3 px-7  flex items-center justify-center "
          >
            View
          </Link>
          <Link
            to="/admin/add"
            className="cursor-pointer text-[10px]  hover:text-white font-semibold hover:bg-stone-500 transition-all duration-300 w-full py-3 px-7  flex items-center justify-center "
          >
            Add
          </Link>
        </div>

        {/* category */}
        <div
          onClick={() => setdropdrop(!dropdrop)}
          className="cursor-pointer z-10  hover:text-white font-semibold hover:bg-stone-500 transition-all duration-300 w-full py-3 px-7  flex items-center gap-3 "
        >
          <h6>Category</h6>
          <BiCaretDown />
        </div>

        <div
          className={`flex-col transition-all duration-600 ease-in-out  hidden -translate-y-5   ${
            dropdrop ? "dropside" : ""
          } `}
        >
          <Link
            to="/admin/view-category"
            className="cursor-pointer text-[10px]  hover:text-white font-semibold hover:bg-stone-500 transition-all duration-300 w-full py-3 px-7  flex items-center justify-center "
          >
            View Category
          </Link>
          <Link
            to="/admin/add-category"
            className="cursor-pointer text-[10px]  hover:text-white font-semibold hover:bg-stone-500 transition-all duration-300 w-full py-3 px-7  flex items-center justify-center "
          >
            Add Category
          </Link>
        </div>
        {/* iklan */}
        <div
          onClick={() => setiklan(!iklan)}
          className="cursor-pointer z-10  hover:text-white font-semibold hover:bg-stone-500 transition-all duration-300 w-full py-3 px-7  flex items-center gap-3 "
        >
          <h6>Iklan</h6>
          <BiCaretDown />
        </div>

        <div
          className={`flex-col transition-all duration-600 ease-in-out  hidden -translate-y-5   ${
            iklan ? "dropside" : ""
          } `}
        >
          <Link
            to="/admin/view-iklan"
            className="cursor-pointer text-[10px]  hover:text-white font-semibold hover:bg-stone-500 transition-all duration-300 w-full py-3 px-7  flex items-center justify-center "
          >
            View Iklan
          </Link>
          <Link
            to="/admin/add-iklan"
            className="cursor-pointer text-[10px]  hover:text-white font-semibold hover:bg-stone-500 transition-all duration-300 w-full py-3 px-7  flex items-center justify-center "
          >
            Add Iklan
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homeadmin;
