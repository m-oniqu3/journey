import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import { ChevronDownIcon } from "@/components/icons";
import CreatePost from "@/components/posts/CreatePost";
import Tabs from "@/components/posts/Tabs";
import SpaceSidebar from "@/components/space/SpaceSidebar";
import { useSpacesContext } from "@/context/useSpacesContext";
import useDetectClickOutside from "@/hooks/useDetectClickOutside";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const tabs = ["Text", "Images & Video", "Link", "Poll"];

function Submit() {
  const { spaceName } = useParams() as { spaceName: string };
  const { state } = useSpacesContext();
  const values = Object.values(state.userspaces);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [search, setSearch] = useState("");
  const [filteredSpaces, setFilteredSpaces] = useState(values);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const dropDownRef = useDetectClickOutside<HTMLDivElement>({
    closeMenu: () => setOpenDropDown(false),
  });

  function handleDropDown() {
    setOpenDropDown((state) => !state);

    // get the position of the button
    if (buttonRef.current)
      setPosition({
        x: buttonRef.current.offsetLeft,
        y: buttonRef.current.offsetTop + buttonRef.current.offsetHeight + 10,
      });
  }

  function handleSpaceClick(name: string) {
    navigate(`/s/${name}/submit`);
    setOpenDropDown(false);
    setPosition({ x: 0, y: 0 });
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);

    if (!e.target.value) setFilteredSpaces(values);

    setFilteredSpaces(
      values.filter((space) => space.name.includes(e.target.value))
    );
  }

  const renderSpaces = filteredSpaces.map((space) => {
    return (
      <li
        key={space.id}
        onClick={() => handleSpaceClick(space.name)}
        className="grid grid-cols-[44px,auto] gap-x-2 gap-y-0  hover:bg-gray-100 cursor-pointer p-2 rounded-xl"
      >
        <img
          src={`https://picsum.photos/seed/${space.name}/200/200`}
          alt={space.name}
          className="h-full w-full rounded-full border-4 border-white shadow-sm col-start-1 col-end-2 row-start-1 row-end-3"
        />

        <p className="font-bold text-sm col-start-2 col-end-3">
          s/{space.name}
        </p>

        <p className="text-sm text-gray-500 col-start-2 col-end-3 ">
          {Math.ceil(Math.random() * 300000)} members
        </p>
      </li>
    );
  });

  return (
    <div className="wrapper page-layout mt-4">
      <main className="main space-y-8">
        <h1 className="text-2xl font-bold">Create post</h1>

        {openDropDown ? (
          <div ref={dropDownRef} className="relative z-100">
            <form>
              <input
                value={search}
                onChange={handleSearch}
                type="text"
                placeholder="Search your spaces"
                autoFocus
                className="input h-12 rounded-full px-4 w-full max-w-96 bg-grayscale-100"
              />
            </form>

            <Overlay position={position}>
              <ul
                onMouseDown={(e) => e.stopPropagation()}
                className="h-72 overflow-y-scroll p-3"
              >
                {search && !renderSpaces.length ? (
                  <p>No Space Found</p>
                ) : (
                  renderSpaces
                )}
              </ul>
            </Overlay>
          </div>
        ) : (
          <Button
            ref={buttonRef}
            onClick={handleDropDown}
            className="flex items-center gap-2 bg-grayscale-100 rounded-full p-2"
          >
            <img
              src={` https://picsum.photos/seed/200/200`}
              alt="name"
              className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
            />

            <p className="font-medium">s/{spaceName}</p>

            <span className="pr-2">
              <ChevronDownIcon />
            </span>
          </Button>
        )}

        <section className="space-y-4">
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <CreatePost activeTab={activeTab} />
        </section>
      </main>

      <div className="sidebar">
        <SpaceSidebar name={spaceName} />
      </div>
    </div>
  );
}

export default Submit;
