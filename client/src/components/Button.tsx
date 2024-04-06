interface Props {
  children: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | undefined;
}

function Button(props: Props) {
  const { children, className = "", type = "button", disabled = false } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} rounded-lg px-4 h-11 font-semibold `}
    >
      {children}
    </button>
  );
}

export default Button;
