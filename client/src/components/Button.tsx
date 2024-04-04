interface Props {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

function Button(props: Props) {
  const { text, className = "", type = "button" } = props;

  return (
    <button type={type} className={`${className} rounded-full px-4 h-12 `}>
      {text}
    </button>
  );
}

export default Button;
