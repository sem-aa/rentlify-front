import React, { useRef, useState, memo } from "react";
import { ButtonClose } from "@/components/ButtonClose";
import useClickOutside from "@/hooks/useClickOutSide";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  resetFilter: () => void;
}

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  resetFilter,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null!);

  useClickOutside(selectRef, () => setIsOpen(false));

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      className="relative flex-grow flex-shrink min-w-[280px]"
      ref={selectRef}
    >
      <div className="relative">
        <button
          type="button"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-turquoise focus:outline-none transition text-gray-700 placeholder-gray-400 bg-white shadow-sm appearance-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value || placeholder || "Select..."}
        </button>

        {value && (
          <ButtonClose
            onClick={resetFilter}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-full p-1 hover:bg-gray-200"
          />
        )}
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          <li
            className="px-4 py-2 text-gray-700  bg-white hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect("")}
          >
            {placeholder || "Select..."}
          </li>
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 text-gray-700 bg-white hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(CustomSelect);
