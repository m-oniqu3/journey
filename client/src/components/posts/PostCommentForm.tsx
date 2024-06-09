import Button from "@/components/Button";
import LoadingBar from "@/components/LoadingBar";
import CommentTextArea from "@/components/posts/CommentTextArea";
import { useAuthContext } from "@/context/useAuthContext";
import { createComment } from "@/services/comment-services";
import { NewComment } from "@/types/comment";
import { handleError } from "@/utils/handleError";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  postID: number;
};

function PostCommentForm(props: Props) {
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useAuthContext();
  const queryClient = useQueryClient();

  function handleTextArea() {
    setIsCommenting((state) => !state);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!state.user || !comment) {
      console.log("comment or user is required");
      return;
    }

    const data: NewComment = {
      content: comment,
      postID: props.postID,
      userID: state.user.id,
    };

    try {
      setIsLoading(true);
      const response = await createComment(data);
      console.log(response);

      // invalidate the query to refetch the comments

      queryClient.invalidateQueries({
        queryKey: ["comments", props.postID],
      });
    } catch (error) {
      const message = handleError(error);
      console.error(message);
    } finally {
      setIsLoading(false);
      setComment("");
      setIsCommenting(false);
    }
  }

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        {!isCommenting && (
          <Button
            type="button"
            disabled={isCommenting}
            onClick={handleTextArea}
            className="bg-white h-12 border-[1px] border-gray-300 text-gray-400 text-left rounded-full w-full cursor-text !font-normal"
          >
            Add Comment
          </Button>
        )}

        {isCommenting && (
          <CommentTextArea
            comment={comment}
            setComment={setComment}
            cancelComment={() => setIsCommenting(false)}
          />
        )}
      </form>

      {isLoading && <LoadingBar />}
    </>
  );
}

export default PostCommentForm;
