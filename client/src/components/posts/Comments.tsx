import CommentList from "@/components/posts/CommentList";
import PostCommentForm from "@/components/posts/PostCommentForm";
import { getCommentsForPost } from "@/services/comment-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "@tanstack/react-query";

type Props = {
  postID: number;
  isFetchingPost: boolean;
};

function Comments(props: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", props.postID],
    queryFn: () => fetchComments(props.postID),
    retry: false,
    // only fetch comments when the post has been fetched
    enabled: !props.isFetchingPost,
  });

  async function fetchComments(postID: number) {
    try {
      const response = await getCommentsForPost(postID);
      return response;
    } catch (error) {
      const message = handleError(error);
      throw new Error(message);
    }
  }

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (!data) return <div>No comments</div>;

  return (
    <section className="space-y-4 md:wrapper">
      <PostCommentForm postID={props.postID} />
      <CommentList postID={props.postID} comments={data} />
    </section>
  );
}

export default Comments;
