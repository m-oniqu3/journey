import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  closeModal: () => void;
  className?: string;
};

function Modal(props: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div
      onClick={props.closeModal}
      className={`z-20 bg-black/60 fixed top-0 left-0 w-full h-full ${
        props.className ?? ""
      }`}
    >
      <div onClick={(e) => e.stopPropagation()}>{props.children}</div>
    </div>,
    document.body
  );
}

export default Modal;

// absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
