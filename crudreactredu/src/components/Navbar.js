import React, { useEffect, useState } from "react";
import { IoCartSharp } from "react-icons/io5";
import { AiOutlineBars, AiOutlineUser } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { opencart } from "../features/Keranjangslice";
import { cartselect, getcart } from "../features/Cartslice";
import { logout } from "../features/Userslice";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdLogin, MdLogout } from "react-icons/md";
import alertify from "alertifyjs";
function Navbar() {
  const [openn, setopenn] = useState(false);
  const [bukalogin, setbukalogin] = useState(false);
  const cartbo = useSelector(cartselect.selectAll);
  const dispatch = useDispatch();
  const [dapat, setdapat] = useState([]);

  const openccart = () => {
    dispatch(opencart());
  };
  useEffect(() => {
    dispatch(getcart());
  }, [dispatch]);

  useEffect(() => {
    axios.get("/api/getuser").then((res) => {
      if (res.data.status === 200) {
        setdapat(res.data.user);
      }
    });
  }, []);

  const logoutt = () => {
    axios.post("/api/logout").then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        dispatch(logout);
        alertify.success(res.data.message);
        window.location.reload();
      }
    });
  };

  return (
    <div className="bg-white flex justify-center w-full h-14 top-0 fixed z-10 ">
      <div className="grid grid-cols-3 w-11/12">
        <div className="md:flex hidden">
          <a href="/">
            <img
              src="https://listcarbrands.com/wp-content/uploads/2017/11/Barkas-logo-600x255.png"
              alt=""
              className="w-28 object-contain"
            />
          </a>
        </div>
        <div className={`navbar gap-5 items-center ${openn ? "open" : ""}`}>
          <a href="/">Home</a>
          <div>About Us</div>
          <a href="/">Contact</a>
        </div>
        <div className="md:flex justify-end items-center gap-5 hidden ">
          <div className="relative cursor-pointer" onClick={openccart}>
            <IoCartSharp className="relative text-2xl" />
            <h6 className="absolute -top-2 -right-3 text-white  bg-red-500 text-[13px] rounded-full w-5 h-5 text-center font-semibold ">
              {cartbo.length}
            </h6>
          </div>
          <div
            className=" cursor-pointer  z-10 "
            onClick={() => setbukalogin(!bukalogin)}
          >
            {dapat ? (
              <img
                src={`http://localhost:8000/${dapat.image}`}
                alt=""
                className="rounded-full h-6 w-6 "
              />
            ) : (
              <img
                src="https://awsimages.detik.net.id/community/media/visual/2020/08/13/avatar-the-last-airbender.webp?w=700&q=90"
                alt=""
                className="rounded-full h-6 w-6"
              />
            )}
            <div
              className={`absolute top-[90px]  w-32 right-6 flex flex-col items-center  cursor-pointer bg-stone-100 border-2 gap-3 ${
                bukalogin ? "flex" : "hidden"
              }`}
            >
              {dapat ? (
                <div>
                  <Link
                    to={`/editprofile/${dapat.id}`}
                    className="flex gap-2 items-center hover:bg-stone-200 p-2"
                  >
                    <AiOutlineUser />
                    <h6> Edit Profile</h6>
                  </Link>
                  <div onClick={logoutt}>
                    <div className="flex items-center gap-2 hover:bg-red-200 p-2">
                      <MdLogout /> <h6>Logout</h6>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="login">
                  <div className="flex items-center gap-2">
                    <MdLogin /> <h6>Login</h6>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="md:hidden flex  justify-start items-center gap-5">
          <div className="relative cursor-pointer">
            <IoCartSharp className="relative text-2xl z-0" />
            <h6 className="absolute -top-2 -right-3 text-white  bg-red-500 text-[13px] rounded-full w-5 h-5 text-center font-semibold ">
              {cartbo.length}
            </h6>
          </div>
        </div>
        <div className="flex md:hidden  justify-center  ">
          <img
            src="https://listcarbrands.com/wp-content/uploads/2017/11/Barkas-logo-600x255.png"
            alt=""
            className="w-28 object-contain"
          />
        </div>
        <div
          className="md:hidden flex items-center justify-end cursor-pointer "
          onClick={() => setopenn(!openn)}
        >
          {openn ? (
            <FaTimes className="z-10 transition-all duration-150" />
          ) : (
            <AiOutlineBars className="z-10" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
