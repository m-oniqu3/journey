type Props = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | undefined;
  onClick?: () => void | undefined;
};

function Button(props: Props) {
  const {
    children,
    className = "",
    type = "button",
    disabled = false,
    onClick = () => {},
  } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} rounded-lg px-4 h-11 font-semibold `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
