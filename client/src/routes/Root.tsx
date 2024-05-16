import ScrollToTop from "@/components/ScrollToTop";
import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div className="grid grid-rows-[4rem,calc(100vh-4rem)]">
      <Navbar className="h-[4rem] fixed w-full z-50 bg-white" />
      <ScrollToTop />
      <main className="grid grid-cols-1 lg2:grid-cols-[270px,1fr] w-full h-full mt-[4rem]">
        <div className="hidden w-[270px] lg2:fixed lg2:block overflow-y-scroll h-[calc(100%-4rem)]">
          <Sidebar />
        </div>

        {/* position outlet since sidebar is fixed */}
        <div className="lg2:ml-[270px] lg2:w-[calc(100vw-270px)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
