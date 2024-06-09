import { AddCircleIcon, CommentIcon, HeartIcon } from "@/components/icons";
import { getRepliesForComment } from "@/services/comment-services";
import { Comment } from "@/types/comment";
import { handleError } from "@/utils/handleError";
import { timeSince } from "@/utils/timeSince";
import { useQuery } from "@tanstack/react-query";

type Props = {
  comment: Comment;
};

function PostComment(props: Props) {
  const {
    comment,
    comment: { creator },
  } = props;

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ["replies", comment.id],
    queryFn: () => fetchReplies(comment.id, comment.post_id),
    enabled: false,
  });

  async function fetchReplies(commentID: number, postID: number) {
    try {
      const response = await getRepliesForComment(commentID, postID);
      console.log(response);
      return response;
    } catch (error) {
      const message = handleError(error);
      console.error("Error fetching replies for comment:", message);
      throw new Error(message);
    }
  }

  // replace new lines with line breaks
  const updatedComment = comment.comment.replace(/\n/g, "<br />");

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
              <div className="" onClick={() => refetch()}>
                <AddCircleIcon className="h-5 w-5 text-dark" />
              </div>
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

      {isLoading && <p>Loading...</p>}

      {isError && <p> Could not get replies for this comment.</p>}
    </>
  );
}

export default PostComment;
