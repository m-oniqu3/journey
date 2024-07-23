import { CommentIcon, HeartIcon, HorizonalEllipsis } from "@/components/icons";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getAuthoredComments } from "@/services/comment-services";
import { handleError } from "@/utils/handleError";
import { timeSince } from "@/utils/timeSince";
import { useQuery } from "@tanstack/react-query";

async function fetchProfileComments() {
  try {
    const response = await getAuthoredComments(0);
    console.log(response);
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
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["profileComments"],
    queryFn: fetchProfileComments,
  });

  function renderCommentDate(details: Details) {
    const { userName, date } = details;
    const time = timeSince(new Date(date));

    if ("replyTo" in details) {
      return (
        <p className="text-sm">
          <span className="font-medium">{userName}</span> replied to
          {details.replyTo} {time}
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

    const comments = data;

    const renderedComments = comments.comments.map((comment) => {
      const { id, body, created_at, post, repliedTo } = comment;

      return (
        <article
          key={id}
          className="p-4 grid grid-cols-[30px,1fr] gap-2 border-t-[1px] border-gray-100 hover:bg-gray-50"
        >
          <figure>
            <img
              src={
                post.spaces?.avatar ||
                `https://picsum.photos/seed/${comment.id}/200`
              }
              alt={post.spaces?.name}
              className="avatar h-7 w-7"
            />
          </figure>

          <div className="flex flex-col gap-3">
            <p className="text-sm">
              <span className="font-medium">s/{post.spaces?.name}</span>
              &nbsp;&#xb7;&nbsp;
              {post.title}
            </p>

            {!repliedTo &&
              renderCommentDate({
                userName: comments.user.display_name || comments.user.username,
                date: created_at,
              })}

            {repliedTo &&
              renderCommentDate({
                userName: comments.user.display_name || comments.user.username,
                date: created_at,
                replyTo: repliedTo.user.display_name || repliedTo.user.username,
              })}

            <p className="">{body}</p>

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

  return <section className="">{renderContent()}</section>;
}

export default ProfileComments;
