import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Rating from "react-rating";
import { ToastContainer } from "react-toastify";

const SearchProducts = ({
  query,
  cartItems,
  handleAddToCart,
  handleInputChange,
  searchResults,
  setSearchResults,
  setQuery,
}) => {
  const [sProducts, setSproducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://dummyjson.com/products/search?q=${query}`
          );
          setSproducts(response.data.products);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {" "}
      {!query && <Navigate to="/" replace={true} />}
      <Header
        cartItems={cartItems}
        query={query}
        handleInputChange={handleInputChange}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        setQuery={setQuery}
      />
      <ToastContainer />
      <div className="bg-white  md:px-20 mt-10 md:mt-2 ">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {sProducts?.length > 0 && !loading && (
            <h2 className="text-xl  font-bold text-left ml-1 md:ml-2  md:text-2xl justracking-tight text-gray-900">
              {`Showing ${sProducts.length} Results for ${query}`}
            </h2>
          )}
          {sProducts?.length === 0 && (
            <div className="flex m-auto justify-center text-center text-gray-700 mt-20 text-2xl md:text-3xl font-semibold ">
              <span>{`Sorry!! No Products Found for ${query}`}</span>
            </div>
          )}
          {loading && (
            <div className="flex justify-center items-center mt-20 md:mt-36 ">
              <div
                className="h-8 w-8 text-sky-600 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
            </div>
          )}
          <div className="m-auto  mt-10  justify-center  grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {!loading &&
              sProducts?.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="relative m-auto md:m-2 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                >
                  <span className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                    <img
                      className="object-cover"
                      src={product.thumbnail}
                      alt="product "
                    />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      {Math.ceil(product.discountPercentage)}% OFF
                    </span>
                  </span>
                  <div className="mt-4 px-5 pb-5">
                    <span>
                      <h5 className="text-lg font-semibold  tracking-tight text-slate-900">
                        {product.title.length > 20
                          ? `${product.title.slice(0, 20)}...`
                          : product.title}{" "}
                      </h5>
                    </span>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <div className="flex flex-col justify-center m-auto ml-2 mdml-0">
                        <span className="text-xl font-bold text-slate-900 ">
                          ${" "}
                          {Math.ceil(
                            product.price -
                              product.price / product.discountPercentage
                          )}
                        </span>
                        <span className="text-sm font-semibold text-slate-900 line-through ">
                          ${product.price}
                        </span>
                      </div>
                      <div className="flex  items-center">
                        <Rating
                          emptySymbol={
                            <span className="icon text-3xl md:text-xl text-yellow-300">
                              &#9734;
                            </span>
                          }
                          fullSymbol={
                            <span className="icon text-3xl md:text-xl text-yellow-300">
                              &#9733;
                            </span>
                          }
                          initialRating={product?.rating}
                          readonly
                        />

                        <span className="mr-2 ml-3 mt-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                          {product?.rating?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <span
                      onClick={(e) => {
                        e.preventDefault(); // Prevents the default navigation behavior
                        handleAddToCart(product);
                      }}
                      className="flex items-center cursor-pointer justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to cart
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProducts;
