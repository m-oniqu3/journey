import Button from "@/components/Button";
import { useAuthContext } from "@/context/useAuthContext";
import { createComment } from "@/services/comment-services";
import { NewComment } from "@/types/comment";
import { handleError } from "@/utils/handleError";
import { useState } from "react";

type Props = {
  postID: number;
};

function PostCommentForm(props: Props) {
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const { state } = useAuthContext();

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
      const response = await createComment(data);
      console.log(response);
    } catch (error) {
      const message = handleError(error);
      console.error(message);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit}>
      {!isCommenting && (
        <Button
          type="button"
          disabled={isCommenting}
          onClick={handleTextArea}
          className="bg-white h-12 border-[1px] border-gray-400 text-gray-400 text-left rounded-full w-full cursor-text !font-normal"
        >
          Add Comment
        </Button>
      )}

      {isCommenting && (
        <div className="border border-gray-400 rounded-2xl p-2">
          <textarea
            className="textarea h-14 no-scrollbar border-none"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="bg-grayscale-100 text-dark text-sm h-9 "
              onClick={() => setIsCommenting(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-dark text-white text-sm h-9">
              Comment
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

export default PostCommentForm;
