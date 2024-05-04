import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import React, { Fragment, useState } from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

function ToggleList(props: Props) {
  const [showChildren, setShowChildren] = useState(true);
  return (
    <Fragment>
      <li
        onClick={() => setShowChildren((state) => !state)}
        className="flex items-center justify-between text-sm uppercase px-3 h-12 mt-2 tracking-widest 
          text-gray-500 hover:bg-grayscale-100 rounded-xl cursor-pointer"
      >
        {props.title}
        {!showChildren ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </li>

      {showChildren && <>{props.children} </>}
    </Fragment>
  );
}

export default ToggleList;
