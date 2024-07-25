import React from "react";
import { createPortal } from "react-dom";

type Props = {
  position: { x: number; y: number };
  children: React.ReactNode;
  closeOverlay: () => void;
  className?: string;
};

function Overlay(props: Props) {
  // const dropDownRef = useDetectClickOutside<HTMLDivElement>({
  //   closeMenu: () => props.closeOverlay(),
  // });

  return createPortal(
    <div
      // ref={dropDownRef}
      style={{ top: props.position.y, left: props.position.x }}
      className={`fixed z-50 rounded-2xl border border-gray-200 bg-white ${props.className}`}
    >
      {props.children}
    </div>,
    document.getElementById("overlay") as HTMLElement
  );
}

export default Overlay;
