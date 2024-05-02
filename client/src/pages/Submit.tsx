import Button from "@/components/Button";
import { ChevronDownIcon } from "@/components/icons";
import CreatePost from "@/components/posts/CreatePost";
import SpaceSidebar from "@/components/space/SpaceSidebar";
import Tabs from "@/components/submit/Tabs";
import { useState } from "react";
import { useParams } from "react-router-dom";

const tabs = ["Text", "Images & Video", "Link", "Poll"];

function Submit() {
  const { spaceName } = useParams() as { spaceName: string };

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="wrapper page-layout mt-4">
      <main className="main space-y-8">
        <h1 className="text-2xl font-bold">Create post</h1>

        <Button className="flex items-center gap-2 bg-grayscale-100 rounded-full p-2">
          <img
            src={` https://picsum.photos/seed/200/200`}
            alt="name"
            className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
          />

          <p className="font-medium">s/{spaceName}</p>

          <span className="pr-2">
            <ChevronDownIcon />
          </span>
        </Button>

        <section className="space-y-4">
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <CreatePost activeTab={activeTab} />
        </section>
      </main>

      <div className="sidebar">
        <SpaceSidebar name={spaceName} />
      </div>
    </div>
  );
}

export default Submit;
