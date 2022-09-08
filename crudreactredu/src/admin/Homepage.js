import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Rou from "../routesadmin/Rou";
import Homeadmin from "./Homeadmin";

function Homepage() {
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
        <main>
          <Routes>
            {Rou.map((item, idx) => {
              return (
                item.component && (
                  <Route
                    key={idx}
                    path={item.path}
                    exact={item.exact}
                    name={item.name}
                    element={(props) => <item.component {...props} />}
                  />
                )
              );
            })}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Homepage;
