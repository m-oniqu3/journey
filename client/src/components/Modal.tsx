import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

function Modal(props: Props) {
  const { children } = props;
  return createPortal(
    <div className="bg-black/50 fixed w-screen h-screen">{children}</div>,
    document.body
  );
}

export default Modal;
