import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | undefined;
  onClick?: () => void | undefined;
  style?: React.CSSProperties;
};

const Button = forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>) => {
  return (
    <button
      style={props.style ?? {}}
      ref={ref}
      type={props.type ?? "button"}
      disabled={props.disabled || false}
      className={`${props.className ?? ""} 
      rounded-full px-4 h-12 font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
});

export default Button;
