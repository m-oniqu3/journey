import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { CiGlobe } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { PiMountainsFill } from "react-icons/pi";
import { VscClose } from "react-icons/vsc";

const spaceTypes = [
  {
    icon: <CiGlobe className="h-7 w-7" />,
    title: "Public",
    description: "Anyone can join, view, and participate in the space.",
  },
  {
    icon: <IoEyeOutline className="h-7 w-7" />,
    title: "Restricted",
    description:
      "Anyone can view the space, but only approved members can participate.",
  },
  {
    icon: <GoLock className="h-7 w-7" />,
    title: "Private",
    description: "Only members can view and participate in the space.",
  },
];

function NewSpace() {
  const renderedSpaceTypes = spaceTypes.map((spaceType) => (
    <header
      key={spaceType.title}
      className="grid grid-cols-[40px,1fr,40px] gap-2 items-start p-4 rounded-xl my-4 hover:bg-gray-50 "
    >
      <span className="grid place-items-center h-full">{spaceType.icon}</span>

      <label htmlFor={spaceType.title} className="flex flex-col gap-1">
        <h3 className="font-medium">{spaceType.title}</h3>
        <p className="text-[0.9rem]">{spaceType.description}</p>
      </label>

      <div className="grid place-items-center h-full">
        <input
          type="radio"
          name="spaceType"
          value={spaceType.title}
          id={spaceType.title}
          className="cursor-pointer"
        />
      </div>
    </header>
  ));

  return (
    <form className="bg-white rounded-xl p-8 w-full max-w-xl">
      <header className="space-y-2 relative">
        <h1 className="text-2xl font-bold flex items-center gap-4">
          <span>
            <PiMountainsFill className="w-9 h-9 text-accent" />
          </span>
          Create a space
        </h1>

        <p className="text-base">
          Build and grow your community to discuss a place you traveled to or a
          place you want to travel to.
        </p>

        <div className="rounded-full bg-grayscale-100 p-1 w-fit absolute -top-2 right-0">
          <VscClose className="w-7 h-7" />
        </div>
      </header>

      <div className="space-y-2">
        <InputField
          name="name"
          label="Name"
          type="text"
          value=""
          setValue={() => {}}
        />

        <p className="text-sm">
          Choose wisely. Once you pick a name, it can't be changed.
        </p>
      </div>

      <h2 className="font-bold text-xl my-4">Type</h2>
      {renderedSpaceTypes}

      <hr />

      <div className="flex gap-2 justify-end p-4">
        <Button className="bg-grayscale-100">Cancel</Button>
        <Button className="bg-accent text-white">Create space</Button>
      </div>
    </form>
  );
}

export default NewSpace;
