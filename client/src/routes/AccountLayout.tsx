import { PiMountainsFill } from "react-icons/pi";
import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

function AccountLayout() {
  return (
    <Fragment>
      <header className="border-slate-200 border-b-[1px]">
        <nav className=" wrapper h-[4.5rem] flex items-center">
          <Link to={"/"} className=" flex items-center gap-4  w-full">
            <PiMountainsFill className="w-9 h-9 text-accent" />
            <p className="text-2xl font-bold text-accent">journey</p>
          </Link>
        </nav>
      </header>

      <main className="wrapper">
        <Outlet />
      </main>
    </Fragment>
  );
}

export default AccountLayout;
