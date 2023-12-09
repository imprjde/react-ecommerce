import { useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Modal from "./Modal";
import ButtonLoader from "./ButtonLoader";
import ConfirmModal from "./ConfirmModal";

export default function Cart({
  cartItems,
  handleRemove,
  handleQuantity,
  query,
  handleInputChange,
  searchResults,
  setSearchResults,
  setQuery,
  setCartItems,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setIsConfirmModalOpen(true);
      setLoading(false);
    }, 3000);
  };

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
    setIsConfirmModalOpen(false);
    setTimeout(() => {
      navigate("/order-placed");
      setIsModalOpen(false);
      setCartItems([]);
    }, 3000);
  };

  const subtotal = cartItems?.reduce((total, item) => {
    return (
      total +
      (item.product.price -
        item.product.price / item.product.discountPercentage) *
        item.qty
    );
  }, 0);

  return (
    <>
      <Header
        cartItems={cartItems}
        query={query}
        handleInputChange={handleInputChange}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        setQuery={setQuery}
      />
      <ToastContainer />

      {isConfirmModalOpen && (
        <ConfirmModal
          setIsConfirmModalOpen={setIsConfirmModalOpen}
          handlePlaceOrder={handlePlaceOrder}
          setLoading={setLoading}
        />
      )}

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}

      <div
        className="my-44 drop-shadow-2xl  "
        style={{ filter: "drop-shadow(0px 4px 6px rgba(139, 92, 246, 0.6))" }}
      >
        <div className="flex h-full m-auto bg-white justify-center rounded-md flex-col md:w-[60%] mt-14 mx-3 md:m-auto overflow-y-auto ">
          {" "}
          <div className="flex-1 overflow-y-auto px-4  py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <div className="text-lg font-medium text-gray-900">
                Shopping cart
              </div>
            </div>

            {cartItems?.length === 0 && (
              <div className="m-auto  flex justify-center items-center">
                <span className="font-semibold mt-10 md:mt-5 text-2xl text-gray-800">
                  Sorry!! Cart is Empty :)
                </span>
              </div>
            )}

            {cartItems?.length > 0 && (
              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartItems?.map((product, index) => (
                      <li key={product.product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product?.product?.thumbnail}
                            alt={product?.product?.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product?.href}>
                                  {product?.product?.title}
                                </a>
                              </h3>
                              <p className="ml-4">
                                ${" "}
                                {Math.ceil(
                                  product?.product?.price -
                                    product?.product?.price /
                                      product?.product?.discountPercentage
                                ) * product?.qty}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product?.product?.brand} |{" "}
                              {product?.product?.category}
                            </p>
                          </div>
                          <div className="flex flex-1  mt-2 justify-between text-sm">
                            <select
                              className="border rounded cursor-pointer appearance-none"
                              value={product?.qty}
                              onChange={(e) =>
                                handleQuantity(index, e.target.value)
                              }
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>

                            <div className="flex">
                              <button
                                onClick={() =>
                                  handleRemove(product?.product?.id)
                                }
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            {cartItems?.length > 0 && (
              <>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(0)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div onClick={handleSubmit} className="mt-6">
                  <span className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    {!loading ? "Place Order" : <ButtonLoader />}
                  </span>
                </div>
              </>
            )}
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <Link
                  to="/"
                  className="tracking-wider flex cursor-pointer font-semibold items-center text-purple-600"
                >
                  <span className="text-base font-bold">
                    {" "}
                    Continue Shopping{" "}
                  </span>
                  <span className="font-extrabold  text-2xl text-center ">
                    &rarr;
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
