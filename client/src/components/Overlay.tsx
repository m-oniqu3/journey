import React from "react";
import { createPortal } from "react-dom";

type Props = {
  position: { x: number; y: number };
  children: React.ReactNode;
};

function Overlay(props: Props) {
  return createPortal(
    <div
      style={{ top: props.position.y, left: props.position.x }}
      className="absolute z-50 rounded-2xl border border-gray-300 bg-white shadow-sm w-full max-w-96"
    >
      {props.children}
    </div>,
    document.getElementById("overlay") as HTMLElement
  );
}

export default Overlay;
