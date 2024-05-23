import PostCommentForm from "@/components/posts/PostCommentForm";
import { useParams } from "react-router-dom";

function Comments() {
  const { postID } = useParams() as {
    spaceName: string;
    postID: string;
    postSlug: string;
  };

  return (
    <>
      <PostCommentForm postID={+postID} />
    </>
  );
}

export default Comments;
