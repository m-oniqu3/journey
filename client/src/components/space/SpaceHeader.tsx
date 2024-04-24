import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import { RiMoreLine } from "react-icons/ri";
import { VscAdd } from "react-icons/vsc";

type Props = {
  name: string;
  banner: string;
  avatar: string;
  members_count: number;
};

function SpaceHeader(props: Props) {
  return (
    <header>
      <div className="bg-teal-400 h-16 w-full" />

      <div className="wrapper mt-6">
        <figure className="flex items-center gap-4">
          <img
            src={
              props.avatar ||
              "https://images.unsplash.com/photo-1680422273918-5f1d443272a5?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={props.name}
            className="h-14 w-14  rounded-full border-4 border-white shadow-sm"
          />

          <figcaption className="">
            <h2 className="text-xl font-bold">{`s/${props.name}`}</h2>
            <p className="text-sm font-normal text-gray-500">
              {props.members_count}{" "}
              {props.members_count === 1 ? "member" : "members"}
            </p>
          </figcaption>
        </figure>

        <div className="flex items-center gap-4 mt-4">
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
