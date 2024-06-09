import {
  AddCircleIcon,
  CommentIcon,
  HeartIcon,
  MinusCircleIcon,
} from "@/components/icons";
import CommentList from "@/components/posts/CommentList";
import CommentTextArea from "@/components/posts/CommentTextArea";
import { getRepliesForComment } from "@/services/comment-services";
import { Comment } from "@/types/comment";
import { handleError } from "@/utils/handleError";
import { timeSince } from "@/utils/timeSince";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  comment: Comment;
};

function PostComment(props: Props) {
  const {
    comment,
    comment: { creator },
  } = props;

  const [isShowingReplies, setIsShowingReplies] = useState(false);
  const [isReplyingToComment, setIsReplyingToComment] = useState(false);

  const [reply, setReply] = useState("");

  const {
    data: replies,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["replies", comment.id],
    queryFn: ({ pageParam }) =>
      fetchReplies(comment.id, comment.post_id, pageParam),
    enabled: false,
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      const nextPage: number | undefined = lastPage?.length
        ? allPages.length
        : undefined;

      return nextPage;
    },
  });

  async function fetchReplies(commentID: number, postID: number, page: number) {
    try {
      const response = await getRepliesForComment(commentID, postID, page);
      return response;
    } catch (error) {
      const message = handleError(error);
      console.error("Error fetching replies for comment:", message);
      throw new Error(message);
    }
  }

  // replace new lines with line breaks
  const updatedComment = comment.comment.replace(/\n/g, "<br />");

  function handleGetReplies() {
    refetch();
    setIsShowingReplies(true);
  }

  function handleHideReplies() {
    setIsShowingReplies(false);
  }

  const allReplies = replies?.pages?.flat() || [];

  return (
    <>
      <li className="grid grid-cols-[40px,1fr] gap-1" key={comment.id}>
        {/* left */}
        <div className="flex flex-col items-center gap-1">
          <figure>
            <img
              src={
                creator.avatar || `https://picsum.photos/seed/${comment.id}/200`
              }
              alt={creator.username}
              className="avatar h-9 w-9"
            />
          </figure>

          {!!comment.repliesCount && (
            <>
              <div className=" h-full border-l-[1px] border-gray-200"></div>

              {!isShowingReplies && (
                <div className="cursor-pointer" onClick={handleGetReplies}>
                  <AddCircleIcon className="h-5 w-5 text-dark" />
                </div>
              )}

              {isShowingReplies && (
                <div className="cursor-pointer" onClick={handleHideReplies}>
                  <MinusCircleIcon className="h-5 w-5 text-dark" />
                </div>
              )}
            </>
          )}
        </div>

        {/* right */}

        <div className="">
          <p className="text-sm mb-2">
            <span className="font-semibold text-dark flex gap-2">
              {creator.display_name}

              <span className="font-normal text-gray-600 text-sm">
                {timeSince(new Date(comment.created_at))}
              </span>
            </span>

            <span className="text-sm">
              @{creator.username || creator.display_name}
            </span>
          </p>

          <div>
            <p dangerouslySetInnerHTML={{ __html: updatedComment }}></p>
          </div>

          {/* likes and reply */}
          <div className="flex gap-4 mt-4">
            <p className="flex items-center gap-1 font-medium text-sm text-dark">
              <HeartIcon />0
            </p>

            <p
              className="flex items-center gap-1 font-medium text-sm text-dark cursor-pointer"
              onClick={() => setIsReplyingToComment(true)}
            >
              <CommentIcon />
              Reply
            </p>
          </div>
        </div>
      </li>

      {/* reply textarea */}
      {isReplyingToComment && (
        <form className="ml-10">
          <CommentTextArea
            comment={reply}
            setComment={setReply}
            cancelComment={() => setIsReplyingToComment(false)}
          />
        </form>
      )}

      {/* replies */}

      {isLoading && <p className="ml-10">Loading...</p>}

      {isError && (
        <p className="ml-10"> Could not get replies for this comment.</p>
      )}

      {replies && isShowingReplies && (
        <div className="ml-10">
          <CommentList comments={allReplies} postID={comment.post_id} />

          <div className="flex gap-2 items-center">
            {hasNextPage && (
              <button
                className="text-sm font-medium text-dark cursor-pointer py-4 w-fit"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            )}

            <p
              className="text-sm font-medium text-dark cursor-pointer py-4 w-fit"
              onClick={handleHideReplies}
            >
              Hide replies
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default PostComment;
