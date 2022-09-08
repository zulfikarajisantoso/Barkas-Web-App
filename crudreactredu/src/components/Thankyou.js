import React from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

function Thankyou() {
  return (
    <div className="flex justify-center h-[70vh]  items-center">
      <div className="flex justfy-center h-auto flex-col items-center ">
        <IoCheckmarkDoneCircle className="text-[300px] text-green-500" />
        <h1 className=" font-bold text-[30px]">Thankyou!!</h1>
        <h6>Terimakasih telah belanja di toko kami</h6>
      </div>
    </div>
  );
}

export default Thankyou;
