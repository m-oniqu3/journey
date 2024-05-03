import Modal from "@/components/Modal";
import NewSpace from "@/components/NewSpace";
import SidebarHeader from "@/components/sidebar/SidebarHeader";
import SidebarSpaces from "@/components/sidebar/SidebarSpaces";
import { useEffect, useState } from "react";

type Props = {
  closeMenu: () => void;
};

const MobileMenu = (props: Props) => {
  const [openCreateSpace, setOpenCreateSpace] = useState(false);

  function closeModals() {
    setOpenCreateSpace(false);
    props.closeMenu();
  }

  // at lg breakpoint, close the menu
  useEffect(() => {
    function handleBreakpoint() {
      if (window.innerWidth >= 1024) {
        props.closeMenu();
      }
    }

    window.addEventListener("resize", handleBreakpoint);

    return () => {
      window.removeEventListener("resize", handleBreakpoint);
    };
  }, [props]);

  return (
    <Modal
      closeModal={props.closeMenu}
      className={openCreateSpace ? "" : "top-[4rem]"}
    >
      {!openCreateSpace && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white fixed top-[4rem] left-0 w-[270px]  z-20  px-4 py-2 overflow-y-scroll h-[calc(100%-4rem)]"
        >
          <SidebarHeader closeSidebar={props.closeMenu} />
          <SidebarSpaces
            openCreateSpaceModal={() => setOpenCreateSpace((s) => !s)}
            closeSidebar={props.closeMenu}
          />
        </div>
      )}

      {openCreateSpace && <NewSpace close={closeModals} />}
    </Modal>
  );
};

export default MobileMenu;
