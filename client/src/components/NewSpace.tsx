import Button from "@/components/Button";
import { SpacesEnum } from "@/context/spaces-reducer";
import { useAuthContext } from "@/context/useAuthContext";
import { useSpacesContext } from "@/context/useSpacesContext";
import { createSpace } from "@/services/space-services";
import { SpacePrivacy } from "@/types/space";
import { useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { PiMountainsFill } from "react-icons/pi";
import { VscClose, VscLoading } from "react-icons/vsc";

const SpacePrivacys = [
  {
    icon: <CiGlobe className="h-7 w-7" />,
    title: "Public",
    description: "Anyone can join, view, and participate in the space.",
    value: SpacePrivacy.Public,
  },
  {
    icon: <IoEyeOutline className="h-7 w-7" />,
    title: "Restricted",
    description:
      "Anyone can view the space, but only approved members can participate.",
    value: SpacePrivacy.Restricted,
  },
  {
    icon: <GoLock className="h-7 w-7" />,
    title: "Private",
    description: "Only members can view and participate in the space.",
    value: SpacePrivacy.Private,
  },
];

type Props = {
  close: () => void;
};

function NewSpace(props: Props) {
  const [characters, setCharacters] = useState(25);
  const [selectedType, setSelectedType] = useState(SpacePrivacys[0].value);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    state: { user },
  } = useAuthContext();

  const { dispatch } = useSpacesContext();

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setCharacters(25 - e.target.value.length);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading((state) => !state);

      // eslint-disable-next-line no-useless-escape
      const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

      if (format.test(name) || name.length < 3 || !user?.id) return;

      const data = { name, type: selectedType, userID: user.id };

      const response = await createSpace(data);

      // update user spaces
      dispatch({ type: SpacesEnum.JOIN_SPACE, payload: response });

      setName("");
      setSelectedType(SpacePrivacy.Public);
      props.close();

      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading((state) => !state);
    }
  }

  const renderedSpacePrivacys = SpacePrivacys.map((type) => {
    const isSelected = selectedType === type.value;
    const style = isSelected ? "bg-gray-100 " : "";

    return (
      <li
        key={type.title}
        className={`grid grid-cols-[40px,1fr,40px] gap-2 items-start p-4 rounded-xl my-4  hover:bg-gray-100 ${style} `}
      >
        <span className="grid place-items-center h-full">{type.icon}</span>

        <label
          htmlFor={type.title}
          className="cursor-pointer flex flex-col gap-1"
        >
          <h3 className="font-medium">{type.title}</h3>
          <p className="text-[0.9rem]">{type.description}</p>
        </label>

        <input
          type="radio"
          name={type.title}
          value={type.value}
          id={type.title}
          className="cursor-pointer grid self-center "
          checked={isSelected}
          onChange={() => setSelectedType(type.value)}
        />
      </li>
    );
  });

  return (
    <form
      className="bg-white rounded-xl p-8 w-full max-w-xl"
      onSubmit={handleSubmit}
    >
      <header className="space-y-2 mb-8 relative">
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

        <div
          className="rounded-full bg-grayscale-100 p-1 w-fit absolute -top-2 right-0 cursor-pointer"
          onClick={props.close}
        >
          <VscClose className="w-7 h-7" />
        </div>
      </header>

      <div className="space-y-2">
        <input
          name="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name your space"
          maxLength={25}
          className="input"
        />

        <p className="flex items-center justify-between">
          <span className="text-sm ">
            Choose wisely. Once you pick a name, it can't be changed.
          </span>
          <span className="text-sm">{characters}</span>
        </p>
      </div>

      <h2 className="font-bold my-4">Type</h2>
      <ul>{renderedSpacePrivacys}</ul>

      <hr />

      <div className="flex gap-2 justify-end p-4">
        <Button onClick={props.close} className="bg-grayscale-100">
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-accent text-white flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <VscLoading className="animate-spin w-6 h-6" />
              Creating
            </>
          ) : (
            "Create Space"
          )}
        </Button>
      </div>
    </form>
  );
}

export default NewSpace;
