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
        <div className="bg-white absolute top-0 left-0 w-[270px] h-full z-20 overflow-y-scroll px-4 py-2">
          <SidebarHeader />

          <SidebarSpaces
            onClick={() => {
              setOpenCreateSpace((s) => !s);
            }}
          />
        </div>
      )}

      {openCreateSpace && <NewSpace close={closeModals} />}
    </Modal>
  );
};

export default MobileMenu;

/**
 * <Modal
          className={!openCommunity ? `top-[4.5rem]` : ""}
          closeModal={() => setOpenMenu(false)}
        >
          {!openCommunity && <MobileMenu setOpenCommunity={setOpenCommunity} />}

          {openCommunity && (
            <NewSpace
              close={() => {
                setOpenCommunity(false);
                setOpenMenu(false);
              }}
            />
          )}
        </Modal>
 */
