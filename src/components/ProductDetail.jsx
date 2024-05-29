import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Rating from "react-rating";
import { ToastContainer } from "react-toastify";

export default function ProductDetail({
  cartItems,
  handleAddToCart,
  query,
  handleInputChange,
  searchResults,
  setSearchResults,
  setQuery,
}) {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const resp = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(resp.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {isLoading && (
        <div className="flex  justify-center items-center mt-36 md:mt-44 ">
          <div
            className="h-8 w-8 text-sky-600 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      )}
      {!isLoading && (
        <div className="bg-white pt-14 md:pt-20">
          <div className="pt-6 ">
            <div className="hidden md:flex mx-auto max-w-2xl   overflow-x-auto  sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              {product?.images?.map((image, index) => (
                <div
                  key={index}
                  className="aspect-h-5  aspect-w-4 lg:aspect-h-4 lg:aspect-w-3  border-2 border-gray-500 mx-4 md:mx-0   my-2 overflow-x-auto rounded-md"
                >
                  <img
                    src={image}
                    alt={product?.title.slice(0, 10)}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>

            <div className=" mx-auto mt-6 max-w-2xl overflow-x-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="flex md:hidden flex-nowrap overflow-x-auto">
                {product?.images?.map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 border-2 border-gray-500 mx-4 md:mx-0 my-2 overflow-x-auto rounded-md"
                  >
                    <img
                      src={image}
                      alt={product?.title.slice(0, 10)}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product?.title}
                </h1>
              </div>

              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <p className="text-3xl tracking-tight text-gray-900">
                  $
                  {Math.ceil(
                    product.price - product.price / product.discountPercentage
                  )}
                </p>

                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Rating
                        emptySymbol={
                          <span className="icon text-3xl md:text-4xl text-yellow-300">
                            &#9734;
                          </span>
                        }
                        fullSymbol={
                          <span className="icon text-3xl md:text-4xl text-yellow-300">
                            &#9733;
                          </span>
                        }
                        initialRating={product?.rating}
                        readonly
                      />
                    </div>
                    <span className="ml-3 text-lg mt-2 font-medium text-indigo-600 hover:text-indigo-500">
                      {product?.rating?.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    onClick={() => handleAddToCart(product)}
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text- font-semibold text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-base font-medium text-gray-900">
                    {product?.category?.slice(0, 1).toUpperCase()}
                    {product?.category?.slice(1, product.length)} |{" "}
                    {product?.brand}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
