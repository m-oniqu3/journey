import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import { HorizonalEllipsis } from "@/components/icons";
import PostMenu from "@/components/posts/PostMenu";
import { useSpacesContext } from "@/context/useSpacesContext";
import useDetectClickOutside from "@/hooks/useDetectClickOutside";
import { timeSince } from "@/utils/timeSince";
import { useState } from "react";

type Props = {
  id: number;
  avatar: string;
  name: string;
  username?: string;
  createdAt: string;
  type: "space" | "user";
  creator: string;
};

function PostHeader(props: Props) {
  const { id, avatar, name, username, createdAt, type } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { state } = useSpacesContext();

  const menuButtonRef = useDetectClickOutside<HTMLButtonElement>({
    closeMenu: () => setIsMenuOpen(false),
  });

  const isJoined = type === "space" && name in state.userspaces;

  function handleMenu(e: React.MouseEvent<HTMLButtonElement>) {
    // menu size is 120px
    // prevent the menu from going off the screen

    const screenWidth = window.innerWidth;
    const overlayWidth = 120;

    if (screenWidth - e.currentTarget.offsetLeft < overlayWidth) {
      // position on the left side of the screen
      setPosition({
        x:
          e.currentTarget.offsetLeft -
          overlayWidth +
          e.currentTarget.offsetWidth,
        y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 5,
      });

      setIsMenuOpen((state) => !state);
      return;
    }

    setPosition({
      x: e.currentTarget.offsetLeft - 40,
      y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 5,
    });

    setIsMenuOpen((state) => !state);
  }

  return (
    <>
      <div className="flex items-center gap-2 wrapper">
        <img
          src={avatar || `https://picsum.photos/seed/${id}/200`}
          alt="avatar"
          className="h-8 w-8 rounded-full "
        />

        <p className="font-bold text-gray-600 text-[0.9rem] flex items-center gap-1">
          t/{name}
          {username && (
            <span className="hidden font-medium text-[0.9rem] sm:block ">
              @{username}
            </span>
          )}
        </p>

        <p className="text-gray-600 text-[0.9rem] ">
          {timeSince(new Date(createdAt))}
        </p>

        <div className="flex items-center gap-2 ml-auto">
          {type === "space" && !isJoined && (
            <Button className="ml-auto cursor-pointer text-white h-8 py-1 px-2 rounded-full bg-accent flex items-center justify-center">
              Join
            </Button>
          )}

          <button
            className="cursor-pointer p-1 rounded-full hover:bg-gray-50"
            onClick={handleMenu}
            ref={menuButtonRef}
          >
            <HorizonalEllipsis />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <Overlay position={position} closeOverlay={() => setIsMenuOpen(false)}>
          <PostMenu creator={props.creator} />
        </Overlay>
      )}
    </>
  );
}

export default PostHeader;
