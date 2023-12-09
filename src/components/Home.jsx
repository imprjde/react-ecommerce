import { useState } from "react";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./Pagination";
import Product from "./Product";
import MobileFilter from "./MobileFilter";
import DesktopFilter from "./DesktopFilter";
import SortComponent from "./SortComponent";

export default function Home({
  products,
  categories,
  skip,
  setSkip,
  totalProducts,
  limit,
  setCategoryFilter,
  handleAddToCart,
  cartItems,
  isLoading,
  sortLTH,
  sortHTL,
  sortRating,
  query,
  handleInputChange,
  searchResults,
  setSearchResults,
  setQuery,
  categoryFilter,
}) {
  const filters = [
    {
      id: "color",
      name: "Category",
      options: categories,
    },
  ];

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [checkedIndex, setCheckedIndex] = useState(null);

  const totalPages = Math.ceil(totalProducts / limit);

  const handlepagination = (index) => {
    setSkip(index * 9);
    setActiveIndex(index + 1);
  };

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
      <div className="bg-white  ">
        <div>
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filters={filters}
            setCategoryFilter={setCategoryFilter}
            setCheckedIndex={setCheckedIndex}
            checkedIndex={checkedIndex}
          />

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline  justify-between border-b border-gray-200 pb-6 pt-10">
              <h1 className="text-4xl font-bold mt-20 tracking-tight text-gray-900">
                Our Products
              </h1>

              <SortComponent
                sortRating={sortRating}
                sortHTL={sortHTL}
                sortLTH={sortLTH}
                setMobileFiltersOpen={setMobileFiltersOpen}
              />
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <DesktopFilter
                  filters={filters}
                  setCategoryFilter={setCategoryFilter}
                  setCheckedIndex={setCheckedIndex}
                  checkedIndex={checkedIndex}
                />

                <Product
                  isLoading={isLoading}
                  products={products}
                  handleAddToCart={handleAddToCart}
                />
              </div>
            </section>

            {!isLoading && (
              <Pagination
                isLoading={isLoading}
                skip={skip}
                totalProducts={totalProducts}
                setSkip={setSkip}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
                totalPages={totalPages}
                handlepagination={handlepagination}
                categoryFilter={categoryFilter}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
}
