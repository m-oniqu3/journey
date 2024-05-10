import Modal from "@/components/Modal";
import NewSpace from "@/components/NewSpace";
import SidebarHeader from "@/components/sidebar/SidebarHeader";
import SidebarSpaces from "@/components/sidebar/SidebarSpaces";
import { useState } from "react";

function Sidebar() {
  const [openCreateSpace, setOpenCreateSpace] = useState(false);

  function handleSpaces() {
    setOpenCreateSpace((state) => !state);
  }

  return (
    <>
      <aside className="hidden overflow-y-scroll h-full w-full border-r-[1px] border-slate-200 px-4 py-2  lg2:block">
        <SidebarHeader />

        <SidebarSpaces openCreateSpaceModal={handleSpaces} />
      </aside>

      {openCreateSpace && (
        <Modal closeModal={() => setOpenCreateSpace(false)}>
          <NewSpace close={() => setOpenCreateSpace(false)} />
        </Modal>
      )}
    </>
  );
}

export default Sidebar;
