import React from "react";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { FaCopyright } from "react-icons/fa";
const DesktopFilter = ({
  filters,
  setCategoryFilter,
  setCheckedIndex,
  checkedIndex,
}) => {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open, index }) => (
            <>
              <h3 key={index} className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, index, optionIdx) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        onChange={() => {
                          setCategoryFilter(option);
                          setCheckedIndex(index);
                        }}
                        type="checkbox"
                        checked={index === checkedIndex}
                        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600 "
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
      <div className="m-auto justify-center items-center space-x-1  flex mt-3">
        <span className="text-gray-800">
          <FaCopyright />
        </span>
        <span className="text-gray-800 font-semibold tracking-wider">
          Prajwal.dev
        </span>
      </div>
    </form>
  );
};

export default DesktopFilter;
