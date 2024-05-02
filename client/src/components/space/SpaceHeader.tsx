import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import useSpaceData from "@/hooks/useSpaceData";
import { RiMoreLine } from "react-icons/ri";
import { VscAdd, VscLoading } from "react-icons/vsc";

type Props = {
  space: {
    id: number;
    name: string;
    banner: string;
    avatar: string;
    members_count: number;
  };
};

function SpaceHeader(props: Props) {
  const { name, avatar, members_count, id } = props.space;
  const { userSpaces, handleJoinLeaveSpace, isJoiningSpace, isLeavingSpace } =
    useSpaceData();

  const isJoined = name in userSpaces;

  const joinButtonContent = (() => {
    if (isJoiningSpace || isLeavingSpace)
      return <VscLoading className="animate-spin w-6 h-6" />;
    if (isJoined) return "Joined";
    return "Join";
  })();

  return (
    <header className="md:mt-2">
      <div className="bg-gray-100 h-16 w-full md:wrapper md:h-28 md:rounded-lg" />
      <div className="wrapper mt-6 md:flex md:items-center md:justify-between md:gap-8 md:px-8 md:relative md:-top-10">
        <figure className="flex items-center gap-4 ">
          <img
            src={avatar || `https://picsum.photos/seed/${id}/200`}
            alt={name}
            className="h-14 w-14 rounded-full border-4 border-white shadow-sm md:h-24 md:w-24 md:relative md:-top-10"
          />

          <figcaption className="">
            <h2 className="text-xl font-extrabold md:text-3xl">{`s/${name}`}</h2>
            <p className="text-sm font-normal text-gray-500 md:hidden">
              {members_count}
              {members_count === 1 ? "member" : "members"}
            </p>
          </figcaption>
        </figure>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <ButtonLink
            route={`/s/${name}/submit`}
            className="bg-white  border-[1px] border-gray-500 text-black rounded-full w-fit flex items-center gap-2 "
          >
            <VscAdd className="h-6 w-6" />
            Create a post
          </ButtonLink>

          <Button
            onClick={() => handleJoinLeaveSpace(isJoined, name)}
            className="bg-accent text-neutral rounded-full w-24 flex justify-center items-center "
          >
            {joinButtonContent}
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
