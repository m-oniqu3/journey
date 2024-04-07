import ButtonLink from "@/components/ButtonLink";
import { useAuthContext } from "@/context/useAuthContext";
import { RoutesEnum } from "@/routes";
import { AiOutlineMenu } from "react-icons/ai";
import { PiMountainsFill } from "react-icons/pi";
import { VscAdd } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

function Navbar() {
  const {
    state: { isLoggedIn },
  } = useAuthContext();

  const styles = !isLoggedIn
    ? "grid-cols-[40px,40px,1fr,auto] lg:grid-cols-[auto,1fr,auto]"
    : "grid-cols-[40px,40px,1fr,auto] lg:grid-cols-[auto,1fr,auto]";

  return (
    <header className="w-full">
      <nav
        className={`wrapper border-b-[1px] border-slate-200 h-[4.5rem] grid items-center gap-3 lg:gap-4 ${styles}`}
      >
        <div className="h-12 w-12 rounded-full hover:bg-grayscale-100 cursor-pointer lg:hidden grid place-items-center">
          <AiOutlineMenu className="h-6 w-auto" />
        </div>

        <div className="flex items-center gap-4  w-full">
          <PiMountainsFill className="w-9 h-9 text-accent" />
          <p className="hidden lg:block text-2xl font-bold text-accent">
            journey
          </p>
        </div>

        <Searchbar className="w-full max-w-2xl mx-auto" />

        {!isLoggedIn && (
          <ButtonLink route="login" className="bg-accent text-neutral">
            Log In
          </ButtonLink>
        )}

        {/* logged in */}

        {isLoggedIn && (
          <div className="flex items-center gap-3 lg:gap-4 ">
            <p className="flex gap-2 items-center">
              <VscAdd className="h-7 w-auto" />
              <span className="font-semibold">Create</span>
            </p>

            <Link to={RoutesEnum.PROFILE}>
              <img
                className="w-11 h-11 rounded-full"
                src="https://picsum.photos/seed/2/200"
                alt="profile"
              />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
