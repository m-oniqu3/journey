import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  closeModal: () => void;
};

function Modal(props: Props) {
  return createPortal(
    <div
      onClick={props.closeModal}
      className="bg-black/50 fixed top-0 left-0 w-screen h-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="wrapper grid h-full place-items-center"
      >
        {props.children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
