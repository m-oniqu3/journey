import { Comment } from "@/types/comment";

type Props = {
  postID: number;
  comments: Comment[];
};

function CommentList(props: Props) {
  const { comments } = props;
  return <div>{JSON.stringify(comments)}</div>;
}

export default CommentList;
