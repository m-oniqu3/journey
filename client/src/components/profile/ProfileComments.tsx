import { CommentIcon, HeartIcon, HorizonalEllipsis } from "@/components/icons";
import LoadingSpinner from "@/components/LoadingSpinner";
import InfiniteScroll from "@/components/space/InfiniteScroll";
import { getAuthoredComments } from "@/services/comment-services";
import { handleError } from "@/utils/handleError";
import { timeSince } from "@/utils/timeSince";
import { useInfiniteQuery } from "@tanstack/react-query";
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
  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
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
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (isError) {
      return <div>Error: {error.message}</div>;
    }

    if (!data) {
      return <div>No comments found</div>;
    }

    const comments = data.pages.flatMap((page) => page.comments);
    const user = data.pages[0].user;

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

              <span className="hover:bg-gray-200 p-1 rounded-full cursor-pointer">
                <HorizonalEllipsis className="w-5 h-5" />
              </span>
            </div>
          </div>
        </article>
      );
    });

    return renderedComments;
  }

  return (
    <InfiniteScroll
      isLoadingIntial={isLoading}
      isLoadingMore={isFetchingNextPage}
      loadMore={() => hasNextPage && fetchNextPage()}
    >
      {renderContent()}
    </InfiniteScroll>
  );
}

export default ProfileComments;
