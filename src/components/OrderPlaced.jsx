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
        src="https://img.freepik.com/free-vector/order-confirmed-concept-illustration_114360-6599.jpg?size=626&ext=jpg&ga=GA1.1.63100998.1692108872&semt=ais"
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
