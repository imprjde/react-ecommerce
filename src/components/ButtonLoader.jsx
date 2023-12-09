import React from "react";

const ButtonLoader = () => {
  return (
    <div
      className=" m-auto flex justify-center h-6 w-6 text-white  animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  );
};

export default ButtonLoader;
