import PostComment from "@/components/posts/PostComment";
import { type Comment } from "@/types/comment";

type Props = {
  postID: number;
  comments: Comment[];
};

function CommentList(props: Props) {
  const { comments } = props;

  const renderedList = comments.map((comment) => {
    return <PostComment key={comment.id} comment={comment} />;
  });

  return <ul className="space-y-6">{renderedList}</ul>;
}

export default CommentList;
