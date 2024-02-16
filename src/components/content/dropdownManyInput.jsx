import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoIosArrowDown } from "react-icons/io";

const DropdownManyInput = ({ MyLabel, DataList, onDataSelect }) => {
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
    setShow(false);
    setSelectedItems([...selectedItems, item]);
    onDataSelect([...selectedItems, item]);
  };
  const handleRemoveItem = (item) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem.id !== item.id
    );
    setSelectedItems(updatedItems);
  };

  const remainingItems = DataList.filter(
    (item) => !selectedItems.includes(item)
  );

  return (
    <div className="mb-4 grid w-full max-w-dm items-center gap-1.5">
      <Label className="text-gray-600">{MyLabel}</Label>
      <div className="relative">
        <div className="relative flex items-center">
          <div
            className="relative flex items-center justify-start border border-gray-100 w-full h-12  px-2 
                 rounded-lg outline-none hover:border-blue-500 transition-all duration-300 focus:border-blue-500 bg-white"
            onClick={() => {
              setShow(!show);
            }}
          >
            <span
              className={`relative inline-block py-1 text-sm flex ${
                selectedItems.length === 0 ? "text-gray-300" : "text-black-300"
              }`}
            >
              {selectedItems.length === 0
                ? "Select..."
                : selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="outline outline-offset-2 outline-blue-500 rounded mx-2 bg-white text-blue-500"
                    >
                      {item.name}
                      <button
                        className="ml-1 text-sm text-red-500"
                        onClick={() => handleRemoveItem(item)}
                      >
                        X
                      </button>
                    </div>
                  ))}
            </span>
          </div>
          <div className="absolute right-4 h-6 w-6 bg-blue-200 flex items-center justify-center rounded-full">
            <IoIosArrowDown
              className={`text-blue-500 transform transition-transform duration-250 ${
                show ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {show && (
          <div className="bg-white rounded-lg mt-2 p-3 border border-gray-200 w-full z-20 text-gray-800 overflow-auto max-h-56 absolute">
            {remainingItems.map((element, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(element)}
                className="py-2 px-3 transition-all rounded-md duration-300 hover:bg-blue-100 cursor-pointer flex items-center text-sm"
              >
                {element.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownManyInput;
