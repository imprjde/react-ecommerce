import React from "react";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="m-auto  h-screen flex flex-col items-center justify-center">
      <img
        className="w-[600px] md:w-[450px]"
        src="image/orderConfirm.jpg"
        alt="orderConfirm"
      />
      <span
        onClick={handleNavigate}
        className="tracking-wider flex cursor-pointer font-semibold items-center text-purple-600"
      >
        <span> Continue Shopping </span>
        <span className="font-extrabold  text-2xl text-center ">&rarr;</span>
      </span>
    </div>
  );
};

export default OrderPlaced;
