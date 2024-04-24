import ButtonLink from "@/components/ButtonLink";
import { useAuthContext } from "@/context/useAuthContext";
import { RoutesEnum } from "@/routes";
import { AiOutlineMenu } from "react-icons/ai";
import { PiMountainsFill } from "react-icons/pi";
import { VscAdd } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

interface Props {
  className?: string;
}
function Navbar(props: Props) {
  const { className = "" } = props;

  const {
    state: { isLoggedIn },
  } = useAuthContext();

  return (
    <header className={`w-full  ${className}`}>
      <nav
        className={`wrapper h-full border-b-[1px] border-slate-200  grid items-center gap-3 grid-cols-[40px,40px,1fr,auto] lg:grid-cols-[auto,1fr,auto] lg:gap-4 `}
      >
        <div className="h-12 w-12 rounded-full hover:bg-grayscale-100 cursor-pointer lg:hidden grid place-items-center">
          <AiOutlineMenu className="h-6 w-auto" />
        </div>

        <div className="flex items-center gap-4 w-full">
          <PiMountainsFill className="w-9 h-9 text-accent" />
          <p className="hidden lg:block text-2xl font-bold text-accent">
            journey
          </p>
        </div>

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
              <VscAdd className="h-7 w-7" />
              <span className="font-semibold">Create</span>
            </p>

            <Link to={RoutesEnum.PROFILE}>
              <div className="w-10 h-10 rounded-full bg-sky-300" />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
