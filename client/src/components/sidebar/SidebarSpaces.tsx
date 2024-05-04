import ToggleList from "@/components/ToggleList";
import { AddIcon, StarIcon } from "@/components/icons";
import useSpaceData from "@/hooks/useSpaceData";
import { Fragment } from "react";
import { Link } from "react-router-dom";

type Props = {
  openCreateSpaceModal: () => void;
  closeSidebar?: () => void;
};

function SidebarSpaces(props: Props) {
  const { userSpaces } = useSpaceData();

  const spaces = userSpaces ? Object.values(userSpaces) : [];
  const createdSpaces = spaces.filter((space) => space.isCreator);

  function renderSpaces(
    spaces: { id: number; name: string; avatar: string; isCreator: boolean }[]
  ) {
    return spaces.map((space) => {
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
  }

  return (
    <Fragment>
      {!!createdSpaces.length && (
        <ToggleList title="Created">
          <ul className=" py-2">{renderSpaces(createdSpaces)}</ul>
        </ToggleList>
      )}

      <ToggleList title="spaces">
        <p
          onClick={props.openCreateSpaceModal}
          className="grid grid-cols-[44px,1fr] gap-1 items-center h-12 cursor-pointer px-2 py-1 hover:bg-grayscale-100 rounded-xl hover:px-2"
        >
          <span className="flex justify-center">
            <AddIcon />
          </span>
          Create a space
        </p>

        <ul className=" py-2 ">{renderSpaces(spaces)}</ul>
      </ToggleList>
    </Fragment>
  );
}

export default SidebarSpaces;
