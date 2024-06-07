import { AddCircleIcon, CommentIcon, HeartIcon } from "@/components/icons";
import { Comment } from "@/types/comment";
import { timeSince } from "@/utils/timeSince";

type Props = {
  comment: Comment;
};

function PostComment(props: Props) {
  const {
    comment,
    comment: { creator },
  } = props;

  // replace new lines with line breaks
  const updatedComment = comment.comment.replace(/\n/g, "<br />");

  return (
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
            <div className="">
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
            <HeartIcon />
            {comment.id * 28}
          </p>

          <p className="flex items-center gap-1 font-medium text-sm text-dark">
            <CommentIcon />
            Reply
          </p>
        </div>
      </div>
    </li>
  );
}

export default PostComment;
