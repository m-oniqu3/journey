import {
  CommentIcon,
  DeleteIcon,
  HeartIcon,
  HorizonalEllipsis,
  PropertyEditIcon,
} from "@/components/icons";
import LoadingSpinner from "@/components/LoadingSpinner";
import Overlay from "@/components/Overlay";
import InfiniteScroll from "@/components/space/InfiniteScroll";
import { useAuthContext } from "@/context/useAuthContext";
import { getAuthoredComments } from "@/services/comment-services";
import { handleError } from "@/utils/handleError";
import { timeSince } from "@/utils/timeSince";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

async function fetchProfileComments(page: number) {
  try {
    const response = await getAuthoredComments(page);
    return response;
  } catch (error) {
    const message = handleError(error);
    throw new Error(message);
  }
}

type Details =
  | { userName: string; date: string }
  | { userName: string; date: string; replyTo: string };

function ProfileComments() {
  const query = useInfiniteQuery({
    queryKey: ["profileComments"],
    initialPageParam: 0,

    queryFn: ({ pageParam }) => fetchProfileComments(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage: number | undefined = lastPage?.comments.length
        ? allPages.length
        : undefined;

      return nextPage;
    },
    retry: false,
  });

  const { state } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const options = [
    {
      id: 1,
      name: "Edit",
      icon: PropertyEditIcon,
      className: "w-6 h-6",
      display: state.user?.id === query.data?.pages[0].user.user_id,
    },
    {
      id: 2,
      name: "Delete",
      icon: DeleteIcon,
      className: "w-6 h-6",
      display: state.user?.id === query.data?.pages[0].user.user_id,
    },
  ];

  async function handlePostAction(action: string) {
    switch (action) {
      case "Edit":
        console.log("Edit post");
        break;
      case "Delete":
        console.log("Delete post");
        break;
      default:
        console.log("Invalid action");
    }
  }

  const renderedOptions = options.map((option) => {
    return (
      <li
        key={option.id}
        className="hover:bg-gray-100 rounded-xl"
        style={{ display: option.display ? "block" : "none" }}
      >
        <button
          className="grid grid-cols-[30px,1fr] gap-4 items-center  p-2 w-full"
          onClick={() => handlePostAction(option.name)}
        >
          <span className="flex items-center justify-center">
            <option.icon className={option.className || ""} />
          </span>
          <span className="text-left">{option.name}</span>
        </button>
      </li>
    );
  });

  function handleMenu(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    // menu size is 120px
    // prevent the menu from going off the screen

    const screenWidth = window.innerWidth;
    const overlayWidth = 115;

    if (screenWidth - e.currentTarget.offsetLeft < overlayWidth) {
      // position on the left side of the screen
      setPosition({
        x:
          e.currentTarget.offsetLeft -
          overlayWidth +
          e.currentTarget.offsetWidth,
        y: e.currentTarget.offsetTop,
      });

      setIsMenuOpen((state) => !state);
      return;
    }

    setPosition({
      x: e.currentTarget.offsetLeft,
      y: e.currentTarget.offsetTop,
    });

    setIsMenuOpen((state) => !state);
  }

  /**
   *
   * @param details
   * @returns Sentences like: "user commented 2 hours ago" or "user replied to user2 2 hours ago"
   */
  function renderCommentDate(details: Details) {
    const { userName, date } = details;
    const time = timeSince(new Date(date));

    if ("replyTo" in details) {
      return (
        <p className="text-sm">
          <span className="font-medium">{userName}</span> replied to
          <span className="font-medium">&nbsp;{details.replyTo}</span> {time}
        </p>
      );
    } else {
      return (
        <p className="text-sm">
          <span className="font-medium">{userName}</span> commented {time}
        </p>
      );
    }
  }

  function renderContent() {
    if (query.isLoading) {
      return <LoadingSpinner />;
    }

    if (query.isError) {
      return <div>Error: {query.error.message}</div>;
    }

    if (!query.data) {
      return <div>No comments found</div>;
    }

    const comments = query.data.pages.flatMap((page) => page.comments);
    const user = query.data.pages[0].user;

    const renderedComments = comments.map((comment) => {
      const { id, body, created_at, post, repliedTo } = comment;

      const titleSlug = post.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .split("_")
        .slice(0, 7)
        .join("_");

      const route = `/s/${post.spaces.name}/${post.id}/${titleSlug}`;

      return (
        <article
          key={id}
          className="p-4 grid grid-cols-[30px,1fr] gap-2 border-t-[1px] border-gray-100 hover:bg-gray-50"
        >
          <Link to={`/s/${post.spaces.name}`}>
            <img
              src={
                post.spaces.avatar ||
                `https://picsum.photos/seed/${comment.id}/200`
              }
              alt={post.spaces.name}
              className="avatar h-7 w-7"
            />
          </Link>

          <div className="flex flex-col gap-3">
            <p className="text-sm ">
              <Link
                to={`/s/${post.spaces.name}`}
                className="font-medium underline-offset-2 hover:underline"
              >
                s/{post.spaces.name}
              </Link>
              &nbsp;&#xb7;&nbsp;
              <Link to={route} className="underline-offset-2 hover:underline">
                {post.title}
              </Link>
            </p>

            {!repliedTo &&
              renderCommentDate({
                userName: user.display_name || user.username,
                date: created_at,
              })}

            {repliedTo &&
              renderCommentDate({
                userName: user.display_name || user.username,
                date: created_at,
                replyTo: repliedTo.user.display_name || repliedTo.user.username,
              })}

            <p>{body}</p>

            <div className=" flex items-center gap-6">
              <span className="flex items-center gap-2 text-dark font-medium text-sm">
                <HeartIcon />
                {comment.id}
              </span>

              <span className="flex items-center gap-2 text-dark font-medium text-sm">
                <CommentIcon />
                Reply
              </span>

              <span
                className="hover:bg-gray-200 p-1 rounded-full cursor-pointer"
                onClick={handleMenu}
              >
                <HorizonalEllipsis className="w-5 h-5" />
              </span>
            </div>

            {isMenuOpen && (
              <Overlay
                position={position}
                closeOverlay={() => setIsMenuOpen(false)}
              >
                <ul className="p-2">{renderedOptions}</ul>
              </Overlay>
            )}
          </div>
        </article>
      );
    });

    return renderedComments;
  }

  return (
    <InfiniteScroll
      isLoadingIntial={query.isLoading}
      isLoadingMore={query.isFetchingNextPage}
      loadMore={() => query.hasNextPage && query.fetchNextPage()}
    >
      {renderContent()}
    </InfiniteScroll>
  );
}

export default ProfileComments;
