import { Disclosure } from "@headlessui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header({
  children,
  cartItems,
  query,
  setQuery,
  handleInputChange,
  searchResults,
  setSearchResults,
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showModal, setShowMoadl] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate("/searchProducts");
    }
  };

  const handleSearchBySuggestion = async (value) => {
    if (value) {
      setQuery(value);
      navigate("/searchProducts");
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${value}`
        );

        if (response) {
          setSearchResults(response.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowMoadl(false);
    }, 100);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed w-full top-0 z-10">
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            {!searchOpen && (
              <div>
                {" "}
                <Link
                  to="/"
                  className="text-white border px-2 py-1 rounded-md  font-extrabold text-2xl md:text-3xl"
                >
                  E-SHOP
                </Link>
              </div>
            )}
            {searchOpen && location.pathname !== "/searchProducts" && (
              <div className="relative md:hidden">
                <form onSubmit={navigateToSearch}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setShowMoadl(true)}
                    onBlur={handleBlur}
                    className="py-2 px-4  ml-2 h-9 rounded-md w-[230px]  border border-gray-300  focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full  -mr-1 px-2 bg-gray-600 text-white rounded-r-md focus:outline-none"
                  >
                    Search
                  </button>
                </form>
                {searchResults?.length > 0 &&
                  query?.length > 0 &&
                  showModal && (
                    <ul className="absolute ml-2 md:flex-col left-0 right-0 bg-white border border-sky-400 rounded-md mt-1">
                      {searchResults?.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleSearchBySuggestion(item.title)}
                          className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                        >
                          {item?.title}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            )}

            <div className="m-auto flex justify-center ">
              <div className="relative m-auto justify-center ">
                {location.pathname !== "/searchProducts" && (
                  <form onSubmit={navigateToSearch}>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={query}
                      onChange={handleInputChange}
                      onFocus={() => setShowMoadl(true)}
                      onBlur={handleBlur}
                      className="py-2 px-4 hidden md:flex w-[500px] border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="absolute font-semibold hidden md:flex -mr-1 items-center right-0 top-0 h-full px-4 bg-gray-600 text-white rounded-r-md focus:outline-none"
                    >
                      Search
                    </button>
                  </form>
                )}
                {searchResults?.length > 0 &&
                  query?.length > 0 &&
                  showModal && (
                    <ul className="absolute hidden md:flex md:flex-col left-0 right-0 bg-white border border-sky-400 rounded-md mt-1">
                      {searchResults?.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleSearchBySuggestion(item.title)}
                          className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                        >
                          {item?.title}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>

            <div>
              <div className="absolute cursor-pointer inset-y-0 right-0   flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!searchOpen ? (
                  <div
                    onClick={() => {
                      setSearchOpen(true);
                    }}
                    className="md:hidden mr-5 mt-2"
                  >
                    {location.pathname !== "/searchProducts" && (
                      <span>
                        <FaSearch
                          className="text-white font-semibold"
                          size={20}
                        />
                      </span>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => setSearchOpen(false)}
                    className="md:hidden mr-4 mt-3"
                  >
                    <span>
                      <IoClose className="text-white mb-2" size={25} />
                    </span>
                  </div>
                )}
                <Link
                  to="/cart"
                  className="relative rounded-full mr-2 mt-2  bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <FaShoppingCart size={28} className="text-white" />
                </Link>
                <span className="bg-red-500 text-white px-2 rounded-full mb-4 -ml-4 z-20 font-semibold mr-5 ">
                  {cartItems?.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {children}
      </>
    </Disclosure>
  );
}
