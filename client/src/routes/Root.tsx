import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div className="grid grid-rows-[4rem,calc(100vh-4rem)]">
      <Navbar className="h-[4rem]" />

      <main className="grid grid-cols-1 lg2:grid-cols-[270px,1fr] ">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
}
