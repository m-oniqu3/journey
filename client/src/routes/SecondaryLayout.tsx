import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

function SecondaryLayout() {
  return (
    <div>
      <Navbar className="h-[4rem]" />

      <main className="wrapper">
        <Outlet />
      </main>
    </div>
  );
}

export default SecondaryLayout;
