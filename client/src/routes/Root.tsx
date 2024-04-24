import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div className="h-screen">
      <Navbar className="h-[4.5rem]" />

      <main
        className="grid grid-cols-1 lg:grid-cols-[270px,1fr] "
        style={{ height: "calc(100vh - 4.5rem)" }}
      >
        <Sidebar />

        <Outlet />
      </main>
    </div>
  );
}
