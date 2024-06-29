import ButtonLink from "@/components/ButtonLink";
import MobileMenu from "@/components/MobileMenu";
import Overlay from "@/components/Overlay";
import { AddIcon, MenuIcon, SolarSystemIcon } from "@/components/icons";
import ProfileMenu from "@/components/profile/ProfileMenu";
import { useAuthContext } from "@/context/useAuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

interface Props {
  className?: string;
}
function Navbar(props: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { className = "" } = props;

  const {
    state: { isLoggedIn },
  } = useAuthContext();

  function handleProfileMenu(e: React.MouseEvent<HTMLButtonElement>) {
    // prevent the menu from going off the screen
    const screenWidth = window.innerWidth;
    const overlayWidth = 180;

    if (screenWidth - e.currentTarget.offsetLeft < overlayWidth) {
      // position on the left side of the screen
      const position = {
        x:
          e.currentTarget.offsetLeft -
          overlayWidth +
          e.currentTarget.offsetWidth,
        y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 15,
      };

      setPosition(position);
      setOpenProfileMenu((state) => !state);
      return;
    }

    // position on the right side of the screen
    const position = {
      x: e.currentTarget.offsetLeft,
      y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 15,
    };

    setPosition(position);
    setOpenProfileMenu((state) => !state);
  }

  return (
    <>
      <header className={`w-full  ${className}`}>
        <nav
          className={`wrapper h-full border-b-[1px] border-slate-200  grid items-center gap-3 grid-cols-[40px,40px,1fr,auto] lg2:grid-cols-[auto,1fr,auto] lg2:gap-4 `}
        >
          <div
            onClick={() => setOpenMenu((state) => !state)}
            className="h-12 w-12 rounded-full hover:bg-grayscale-100 cursor-pointer lg2:hidden grid place-items-center"
          >
            <MenuIcon />
          </div>

          <Link to="/" className="flex items-center gap-4 w-full">
            <SolarSystemIcon className="w-7 h-7 text-accent" />
            <p className="hidden lg2:block text-2xl  text-accent">journey</p>
          </Link>

          <Searchbar className="w-full max-w-lg mx-auto" />

          {!isLoggedIn && (
            <ButtonLink
              route="login"
              className="bg-accent text-neutral rounded-full"
            >
              Log In
            </ButtonLink>
          )}

          {/* logged in */}

          {isLoggedIn && (
            <div className="flex items-center gap-2 md:gap-8  ">
              <Link
                to={"/submit"}
                className="flex gap-2 items-center px-4 h-11 rounded-full hover:bg-grayscale-100"
              >
                <AddIcon />
                <span className="font-semibold">Create</span>
              </Link>

              <button onClick={handleProfileMenu} className="w-10 h-10">
                <img
                  src="https://picsum.photos/seed/1/200"
                  alt="avatar"
                  className=" rounded-full"
                />
              </button>
            </div>
          )}
        </nav>
      </header>

      {openMenu && <MobileMenu closeMenu={() => setOpenMenu(false)} />}

      {openProfileMenu && (
        <Overlay
          position={position}
          closeOverlay={() => setOpenProfileMenu(false)}
        >
          <ProfileMenu />
        </Overlay>
      )}
    </>
  );
}

export default Navbar;
