import useDetectClickOutside from "@/hooks/useDetectClickOutside";
import React from "react";
import { createPortal } from "react-dom";

type Props = {
  position: { x: number; y: number };
  children: React.ReactNode;
  closeOverlay: () => void;
};

function Overlay(props: Props) {
  const dropDownRef = useDetectClickOutside<HTMLDivElement>({
    closeMenu: () => props.closeOverlay(),
  });

  return createPortal(
    <div
      ref={dropDownRef}
      style={{ top: props.position.y, left: props.position.x }}
      className="absolute z-50 rounded-2xl border border-gray-300 bg-white shadow-sm w-full max-w-96"
    >
      {props.children}
    </div>,
    document.getElementById("overlay") as HTMLElement
  );
}

export default Overlay;
