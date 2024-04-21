interface Props {
  name: string;
  label: string;
  placeholder?: string | undefined;
  value: string;
  setValue: (value: string) => void;
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
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-slate-300 block w-full p-3${
          isError ? "border-red-500" : ""
        }`}
      />
    </div>
  );
}

export default InputField;
