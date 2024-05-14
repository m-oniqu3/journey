import Button from "@/components/Button";
import { HorizonalEllipsis } from "@/components/icons";
import { useSpacesContext } from "@/context/useSpacesContext";
import { timeSince } from "@/utils/timeSince";

type Props = {
  id: number;
  avatar: string;
  name: string;
  username?: string;
  createdAt: string;
  type: "space" | "user";
};

function PostHeader(props: Props) {
  const { id, avatar, name, username, createdAt, type } = props;

  const { state } = useSpacesContext();

  const isJoined = type === "space" && name in state.userspaces;

  return (
    <div className="flex items-center gap-2 wrapper">
      <img
        src={avatar || `https://picsum.photos/seed/${id}/200`}
        alt="avatar"
        className="h-8 w-8 rounded-full "
      />

      <p className="font-bold text-gray-600 text-[0.9rem] flex items-center gap-1 sm:text-sm">
        t/{name}
        {username && (
          <span className="hidden font-normal text-[0.9rem] sm:block sm:text-sm">
            @{username}
          </span>
        )}
      </p>

      <p className="text-gray-600 font-medium text-[0.9rem] sm:text-sm">
        {timeSince(new Date(createdAt))} ago
      </p>

      <div className="flex items-center gap-2 ml-auto">
        {type === "space" && (
          <Button className="ml-auto cursor-pointer text-white h-8 py-1 px-2 rounded-full bg-accent flex items-center justify-center">
            {isJoined ? "Joined" : "Join"}
          </Button>
        )}

        <span className="cursor-pointer p-1 rounded-full hover:bg-gray-50">
          <HorizonalEllipsis />
        </span>
      </div>
    </div>
  );
}

export default PostHeader;
