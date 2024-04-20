import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div className="h-screen">
      <Navbar className="h-[4.5rem]" />

      <main
        className="wrapper grid grid-cols-1 lg:grid-cols-[270px,1fr] gap-4  "
        style={{ height: "calc(100vh - 4.5rem)" }}
      >
        <Sidebar />
        <div className="mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
