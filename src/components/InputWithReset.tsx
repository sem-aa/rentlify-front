import { ButtonClose } from "./ButtonClose";

interface InputWithResetProps {
  type?: "text" | "number";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  resetFilter: () => void;
}

export const InputWithReset = ({
  type = "text",
  value,
  onChange,
  placeholder,
  resetFilter,
}: InputWithResetProps) => {
  return (
    <div className="relative w-full">
      <input
        className="w-full px-4 py-2 border  rounded-lg focus:ring-2 focus:ring-turquoise focus:outline-none transition text-gray-700 placeholder-gray-400 bg-white shadow-sm"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {value && (
        <ButtonClose
          onClick={resetFilter}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-full p-1 hover:bg-gray-200"
        />
      )}
    </div>
  );
};
