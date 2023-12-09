import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
  isLoading,
  skip,
  totalProducts,
  setSkip,
  setActiveIndex,
  activeIndex,
  totalPages,
  handlepagination,
  categoryFilter,
}) => {
  return (
    <>
      {" "}
      {!isLoading && !categoryFilter && (
        <p className="text-sm md:hidden m-auto pb-3 justify-center text-gray-700 ">
          Showing <span className="font-medium">{skip + 1}</span> to{" "}
          <span className="font-medium">{skip === 99 ? "100" : skip + 9}</span>{" "}
          of{" "}
          <span className="font-medium">{totalProducts && totalProducts}</span>{" "}
          results
        </p>
      )}
      {!isLoading && categoryFilter && (
        <div>
          <p className="text-sm md:hidden pb-3 text-gray-700">
            Showing <span className="font-medium">0</span> to{" "}
            <span className="font-medium">{totalProducts}</span> of{" "}
            <span className="font-medium">
              {totalProducts && totalProducts}
            </span>{" "}
            results
          </p>
        </div>
      )}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        {!isLoading && !categoryFilter && (
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              disabled={skip === 0}
              onClick={() => {
                setSkip(skip - 9);
                setActiveIndex(activeIndex - 1);
              }}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              disabled={skip === 99}
              onClick={() => {
                setSkip(skip + 9);
                setActiveIndex(activeIndex + 1);
              }}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          {!categoryFilter && (
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{skip + 1}</span> to{" "}
                <span className="font-medium">
                  {skip === 99 ? "100" : skip + 9}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {totalProducts && totalProducts}
                </span>{" "}
                results
              </p>
            </div>
          )}
          {categoryFilter && (
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">0</span> to{" "}
                <span className="font-medium">{totalProducts}</span> of{" "}
                <span className="font-medium">
                  {totalProducts && totalProducts}
                </span>{" "}
                results
              </p>
            </div>
          )}
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                disabled={skip === 0}
                onClick={() => {
                  setSkip(skip - 9);
                  setActiveIndex(activeIndex - 1);
                }}
                className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

              {totalPages &&
                Array(totalPages)
                  .fill()
                  .map((num, index) => (
                    <button
                      onClick={() => handlepagination(index)}
                      key={index}
                      aria-current="page"
                      className={`relative z-10 inline-flex items-center ${
                        activeIndex - 1 === index
                          ? " bg-indigo-600 text-white"
                          : "bg-white text-gray-700 "
                      }  px-4 py-2 text-sm border font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      {index + 1}
                    </button>
                  ))}
              <button
                disabled={skip === 99}
                onClick={() => {
                  setSkip(skip + 9);
                  setActiveIndex(activeIndex + 1);
                }}
                className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
