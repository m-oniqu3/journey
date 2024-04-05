import { AiOutlineMenu } from "react-icons/ai";
import { PiMountainsFill } from "react-icons/pi";
import Button from "./Button";
import Searchbar from "./Searchbar";

function Navbar() {
  return (
    <header className="w-full">
      <nav className="wrapper border-b-[1px] border-slate-200 h-[4.5rem] grid grid-cols-[40px,40px,1fr,auto] items-center gap-3 lg:gap-4 lg:grid-cols-[auto,1fr,auto]">
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
        <Button
          text="Log In"
          className="bg-accent text-neutral font-semibold"
        />
      </nav>
    </header>
  );
}

export default Navbar;
