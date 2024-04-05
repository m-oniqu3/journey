import { Dispatch } from "react";

interface Props {
  name: string;
  label: string;
  placeholder?: string | undefined;
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  type: string;
  isError?: boolean | undefined;
}

function InputField(props: Props) {
  const {
    name,
    type,
    label,
    value,
    setValue,
    placeholder = label,
    isError,
  } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="block mb-2  dark:text-white">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-slate-300 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
          isError ? "border-red-500" : ""
        }`}
      />
    </div>
  );
}

export default InputField;
