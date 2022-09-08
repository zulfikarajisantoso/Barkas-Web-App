import React from "react";
import { SiVisa } from "react-icons/si";
import { MdPayment } from "react-icons/md";

function Footer() {
  return (
    <div className="w-full h-20 bottom-0 flex  left-0 bg-white justify-center items-center mt-24 ">
      <div className="w-9/12 flex justify-between">
        <h5>All Rights Reserved © 2022 Zulfikarajisantoso</h5>
        <div className="flex gap-3 items-center text-[26px]">
          <MdPayment />
          <SiVisa />
        </div>
      </div>
    </div>
  );
}

export default Footer;
