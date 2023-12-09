import React from "react";

const ConfirmModal = ({
  setIsConfirmModalOpen,
  handlePlaceOrder,
  setLoading,
}) => {
  return (
    <>
      <div className="fixed left-0 px-4 md:px-0  top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-50">
        <div className="max-h-full w-full max-w-xl overflow-y-auto rounded-md px-4 bg-white">
          <div className="w-full  h-[200px] flex flex-col m-auto items-center">
            <div className="flex m-auto items-center">
              <span className="text-xl text-gray-800  font-bold tracking-wider ">
                Confirm Your Order ?
              </span>
            </div>
            <div className="mb-7 md:mb-3 space-x-4">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="bg-gray-500 text-white px-4 font-semibold py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceOrder}
                className="bg-sky-500 text-white px-4 py-2 font-semibold  rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
