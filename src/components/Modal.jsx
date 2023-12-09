import React from "react";

const Modal = () => {
  return (
    <>
      <div className="fixed left-0 px-4 md:px-0  top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-50">
        <div className="max-h-full w-full max-w-xl overflow-y-auto rounded-md px-4 bg-white">
          <div className="w-full">
            <div className="m-8 my-20 max-w-[400px] mx-auto">
              <div className="mb-8 ">
                <h1 className="mb-4 text-2xl  font-bold flex m-auto justify-center tracking-wider">
                  Placing Your Order...
                </h1>
                <div className="pt-4">
                  <p className="text-gray-600   flex m-auto justify-center font-semibold">
                    <span
                      className=" m-auto flex justify-center h-8 w-8 text-gray-800  animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
