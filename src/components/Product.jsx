import React from "react";
import { Link } from "react-router-dom";
import Rating from "react-rating";

const Product = ({ isLoading, products, handleAddToCart }) => {
  return (
    <div className="col-span-3">
      <div className="bg-white ">
        <div className="mx-auto mt-10 max-w-2xl px-4 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          {isLoading && (
            <div
              className=" m-auto flex justify-center h-8 w-8 text-sky-600  animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          )}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {!isLoading &&
              products?.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="relative m-auto md:m-2 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                >
                  <span
                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                    href="void0"
                  >
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
    </div>
  );
};

export default Product;
