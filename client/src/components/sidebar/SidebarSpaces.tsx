import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  GlobeIcon,
  StarIcon,
} from "@/components/icons";
import useSpaceData from "@/hooks/useSpaceData";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  openCreateSpaceModal: () => void;
  closeSidebar?: () => void;
};

function SidebarSpaces(props: Props) {
  const [showSpaces, setShowSpaces] = useState(true);
  const { userSpaces } = useSpaceData();

  const spaces = userSpaces ? Object.values(userSpaces) : [];

  const renderSpaces = spaces.map((space) => {
    return (
      <li
        key={space.id}
        onClick={props.closeSidebar || (() => {})}
        className="px-2 py-1 hover:bg-grayscale-100 rounded-xl hover:px-2"
      >
        <Link
          to={`/s/${space.name}`}
          className="grid grid-cols-[44px,1fr,auto] gap-1 items-center font-normal"
        >
          <img
            src={space.avatar || `https://picsum.photos/seed/${space.id}/200`}
            className="w-10 h-10 rounded-full"
          />

          <span className="lowercase">{`s/${space.name}`}</span>

          <StarIcon className="self-center" />
        </Link>
      </li>
    );
  });

  return (
    <Fragment>
      <ul>
        <li
          onClick={() => setShowSpaces((state) => !state)}
          className="flex items-center justify-between text-sm uppercase px-3 h-12 mt-2 tracking-widest 
          text-gray-500 hover:bg-grayscale-100 rounded-xl cursor-pointer"
        >
          spaces
          {!showSpaces ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </li>

        {showSpaces && (
          <>
            <li onClick={props.closeSidebar || (() => {})}>
              <Link
                to="/spaces"
                className="grid grid-cols-[44px,1fr] gap-1 items-center h-12 cursor-pointer px-2 py-1
                 hover:bg-grayscale-100 rounded-xl hover:px-2"
              >
                <span className="flex justify-center">
                  <GlobeIcon />
                </span>
                Spaces
              </Link>
            </li>

            <li
              onClick={props.openCreateSpaceModal}
              className="mb-2 grid grid-cols-[44px,1fr] gap-1 items-center h-12 cursor-pointer px-2 py-1 hover:bg-grayscale-100 rounded-xl hover:px-2"
            >
              <span className="flex justify-center">
                <AddIcon />
              </span>
              Create a space
            </li>
          </>
        )}
      </ul>

      {showSpaces && (
        <ul className="border-t-[1px] border-slate-200 py-2 ">
          {renderSpaces}
        </ul>
      )}
    </Fragment>
  );
}

export default SidebarSpaces;
