import {
  AddCircleIcon,
  CommentIcon,
  HeartIcon,
  MinusCircleIcon,
} from "@/components/icons";
import CommentList from "@/components/posts/CommentList";
import { getRepliesForComment } from "@/services/comment-services";
import { Comment } from "@/types/comment";
import { handleError } from "@/utils/handleError";
import { timeSince } from "@/utils/timeSince";
import { useQuery } from "@tanstack/react-query";
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
  const {
    data: replies,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["replies", comment.id],
    queryFn: () => fetchReplies(comment.id, comment.post_id),
    enabled: false,
  });

  async function fetchReplies(commentID: number, postID: number) {
    try {
      const response = await getRepliesForComment(commentID, postID);
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

            <p className="flex items-center gap-1 font-medium text-sm text-dark">
              <CommentIcon />
              Reply
            </p>
          </div>
        </div>
      </li>

      {/* replies */}

      {isLoading && <p className="ml-10">Loading...</p>}

      {isError && (
        <p className="ml-10"> Could not get replies for this comment.</p>
      )}

      {replies && isShowingReplies && (
        <div className="ml-10">
          <CommentList comments={replies} postID={comment.post_id} />

          <p
            className="text-sm font-medium text-dark cursor-pointer py-4 underline-offset-2 hover:underline w-fit"
            onClick={handleHideReplies}
          >
            Hide replies
          </p>
        </div>
      )}
    </>
  );
}

export default PostComment;
