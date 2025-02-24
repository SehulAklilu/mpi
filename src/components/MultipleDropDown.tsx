import React, { useState, useRef, useEffect } from "react";
import { useController, Control } from "react-hook-form";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";

type Option = {
  value: string;
  label: string;
  image?: string;
};

type MultiSelectProps = {
  control: Control<any>;
  name: string;
  options: Option[] | [];
};

const MultiSelectDropdown: React.FC<MultiSelectProps> = ({
  control,
  name,
  options,
}) => {
  const { field } = useController({ control, name });
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(search.toLowerCase()) &&
      (field.value || []).includes(option.value) === false
  );

  const toggleSelection = (value: string) => {
    const currentValues = field.value || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item: string) => item !== value)
      : [...currentValues, value];
    field.onChange(updatedValues);
  };

  return (
    <div className="relative w-full " ref={dropdownRef}>
      <div
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {field.value.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {field.value.map((val: string) => {
              const selectedOption = options.find((opt) => opt.value === val);
              return selectedOption ? (
                <div
                  key={val}
                  className="flex items-center bg-primary pl-4 text-white px-2 py-1 rounded-full"
                >
                  {selectedOption.image && (
                    <img
                      className="w-5 h-5 rounded-full mr-1"
                      src={selectedOption.image}
                      alt={selectedOption.label}
                    />
                  )}
                  <span>{selectedOption.label}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelection(val);
                    }}
                    className="ml-2 text-sm"
                  >
                    <IoMdClose />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <span className="text-gray-400">Select items...</span>
        )}
        <span className="ml-auto">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-lg z-10">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
          />
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => toggleSelection(option.value)}
                >
                  {option.image && (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={option.image}
                      alt={option.label}
                    />
                  )}
                  <p>{option.label}</p>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
