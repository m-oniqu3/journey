import ButtonLink from "@/components/ButtonLink";
import MobileMenu from "@/components/MobileMenu";
import { AddIcon, MenuIcon, SolarSystemIcon } from "@/components/icons";
import { useAuthContext } from "@/context/useAuthContext";
import { RoutesEnum } from "@/routes";
import { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

interface Props {
  className?: string;
}
function Navbar(props: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  const { className = "" } = props;

  const {
    state: { isLoggedIn },
  } = useAuthContext();

  return (
    <>
      <header className={`w-full  ${className}`}>
        <nav
          className={`wrapper h-full border-b-[1px] border-slate-200  grid items-center gap-3 grid-cols-[40px,40px,1fr,auto] lg:grid-cols-[auto,1fr,auto] lg:gap-4 `}
        >
          <div
            onClick={() => setOpenMenu((state) => !state)}
            className="h-12 w-12 rounded-full hover:bg-grayscale-100 cursor-pointer lg:hidden grid place-items-center"
          >
            <MenuIcon />
          </div>

          <Link to="/" className="flex items-center gap-4 w-full">
            <SolarSystemIcon className="w-7 h-7 text-accent" />
            <p className="hidden lg:block text-2xl  text-accent">journey</p>
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
            <div className="flex items-center gap-8  ">
              <p className="flex gap-2 items-center">
                <AddIcon />
                <span className="font-semibold">Create</span>
              </p>

              <Link to={RoutesEnum.PROFILE}>
                <div className="w-10 h-10 rounded-full bg-sky-300" />
              </Link>
            </div>
          )}
        </nav>
      </header>

      {openMenu && <MobileMenu closeMenu={() => setOpenMenu(false)} />}
    </>
  );
}

export default Navbar;
