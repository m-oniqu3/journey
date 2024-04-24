import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import { RiMoreLine } from "react-icons/ri";
import { VscAdd } from "react-icons/vsc";

type Props = {
  space: {
    name: string;
    banner: string;
    avatar: string;
    members_count: number;
  };
};

function SpaceHeader(props: Props) {
  const { name, avatar, members_count } = props.space;
  return (
    <header className="md:mt-2">
      <div className="bg-teal-400 h-16 w-full md:wrapper md:h-28 md:rounded-lg" />

      <div className="wrapper mt-6 md:flex md:items-center md:justify-between md:gap-8 md:px-8 md:relative md:-top-10">
        <figure className="flex items-center gap-4 ">
          <img
            src={
              avatar ||
              "https://images.unsplash.com/photo-1680422273918-5f1d443272a5?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={name}
            className="h-14 w-14 rounded-full border-4 border-white shadow-sm md:h-24 md:w-24 md:relative md:-top-10"
          />

          <figcaption className="">
            <h2 className="text-xl font-bold md:text-4xl">{`s/${name}`}</h2>
            <p className="text-sm font-normal text-gray-500 md:hidden">
              {members_count}
              {members_count === 1 ? "member" : "members"}
            </p>
          </figcaption>
        </figure>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <ButtonLink
            route="/spaces/create"
            className="bg-white  border-[1px] border-gray-500 text-black rounded-full w-fit flex items-center gap-2 "
          >
            <VscAdd className="h-6 w-6" />
            Create a post
          </ButtonLink>

          <Button
            onClick={() => {}}
            className="bg-accent text-neutral rounded-full"
          >
            Join
          </Button>

          <button
            onClick={() => {}}
            className="border-[1px] border-gray-500 text-neutral rounded-full w-11 h-11 grid place-items-center "
          >
            <RiMoreLine className=" h-7 w-7 text-black" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default SpaceHeader;
