import Button from "@/components/Button";
import SpaceSidebar from "@/components/space/SpaceSidebar";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";

function Submit() {
  const { spaceName } = useParams() as { spaceName: string };

  return (
    <div className="wrapper page-layout mt-4">
      <main className="main space-y-4">
        <h1 className="text-2xl font-bold">Create post</h1>

        <Button className="flex items-center gap-3 bg-grayscale-100 rounded-lg px-2">
          <img
            src={` https://picsum.photos/seed/200/200`}
            alt="name"
            className="h-9 w-9 rounded-full border-2 border-white shadow-sm"
          />

          <p className="font-medium">s/{spaceName}</p>

          <IoIosArrowDown className="h-7 w-7 pr-2" />
        </Button>
      </main>

      <div className="sidebar">
        <SpaceSidebar name={spaceName} />
      </div>
    </div>
  );
}

export default Submit;
