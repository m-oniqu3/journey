import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | undefined;
  onClick?: () => void | undefined;
};

const Button = forwardRef((props: Props, ref: React.Ref<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      type={props.type}
      disabled={props.disabled || false}
      className={`${
        props.className ?? ""
      } rounded-full px-4 h-12 font-semibold `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
});

export default Button;
