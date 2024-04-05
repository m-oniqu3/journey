interface Props {
  children: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

function Button(props: Props) {
  const { children, className = "", type = "button" } = props;

  return (
    <button
      type={type}
      className={`${className} rounded-lg px-4 h-11 font-semibold `}
    >
      {children}
    </button>
  );
}

export default Button;
