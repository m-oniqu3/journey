import Modal from "@/components/Modal";
import NewSpace from "@/components/NewSpace";
import useSpaceData from "@/hooks/useSpaceData";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { RiCompassLine } from "react-icons/ri";
import { VscAdd } from "react-icons/vsc";
import { Link } from "react-router-dom";

const links = [
  {
    title: "Home",
    to: "/",
    icon: <AiOutlineHome className="h-7 w-7 " />,
  },

  {
    title: "Favourites",
    to: "/favourites",
    icon: <FaRegStar className="h-7 w-7 " />,
  },
  {
    title: "Explore",
    to: "/explore",
    icon: <RiCompassLine className="h-7 w-7 " />,
  },
];

function Sidebar() {
  const [openCommunity, setOpenCommunity] = useState(false);
  const { userSpaces } = useSpaceData();

  const spaces = userSpaces ? Object.values(userSpaces) : [];

  function handleOpenCommunity() {
    setOpenCommunity((state) => !state);
  }

  const renderSpaces = spaces.map((space) => {
    return (
      <li
        key={space.id}
        className="px-2 py-1 hover:bg-grayscale-100 rounded-xl hover:px-2"
      >
        <Link
          to={`/s/${space.name}`}
          className="grid grid-cols-[44px,1fr,40px] gap-1 items-center font-normal "
        >
          <img
            src={space.avatar || `https://picsum.photos/seed/${space.id}/200`}
            className="w-10 h-10 rounded-full"
          />

          <span className="lowercase">{`s/${space.name}`}</span>

          <CiStar className="h-6 w-6" />
        </Link>
      </li>
    );
  });

  return (
    <>
      <aside className="hidden overflow-y-scroll h-full w-full border-r-[1px] border-slate-200 p-4  lg:block">
        <ul className="border-b-[1px] border-slate-200 pb-2">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="grid items-center grid-cols-[30px,1fr] h-12 gap-2 font-normal px-2 py-1 hover:bg-grayscale-100 rounded-xl hover:px-2 "
              >
                <span className="grid place-items-center">{link.icon}</span>

                <span>{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <ul>
          <h2 className="text-sm uppercase px-2 py-4 tracking-widest text-gray-500 ">
            spaces
          </h2>

          <li
            onClick={handleOpenCommunity}
            className="grid grid-cols-[44px,1fr] gap-1 items-center h-12 cursor-pointer px-2 py-1 hover:bg-grayscale-100 rounded-xl hover:px-2"
          >
            <span>
              <VscAdd className="h-7 w-7" />
            </span>
            Create a space
          </li>

          {renderSpaces}
        </ul>
      </aside>

      {openCommunity && (
        <Modal closeModal={() => setOpenCommunity(false)}>
          <NewSpace close={() => setOpenCommunity(false)} />
        </Modal>
      )}
    </>
  );
}

export default Sidebar;
