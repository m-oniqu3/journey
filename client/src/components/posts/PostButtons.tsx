import { CommentIcon, HeartIcon } from "@/components/icons";
import { getCommentsForPost } from "@/services/comment-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "@tanstack/react-query";
import { VscLoading } from "react-icons/vsc";

type Props = {
  postID: number;
  postLikes: number;
};

function PostButtons(props: Props) {
  // get comments for the post
  const { data, isLoading } = useQuery({
    queryKey: ["comments", props.postID],
    queryFn: () => fetchComments(props.postID),
    retry: false,
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

  const commentContent = (() => {
    if (isLoading) return <VscLoading className="animate-spin w-4 h-4" />;
    return data?.length || 0;
  })();

  return (
    <div className=" flex items-center gap-4 mt-4">
      <span className="flex items-center gap-2 text-dark font-semibold bg-grayscale-100  py-2 px-4 rounded-full text-sm">
        <HeartIcon />
        {props.postLikes}
      </span>

      <span className="flex items-center gap-2 text-dark font-semibold bg-grayscale-100  py-2 px-4 rounded-full text-sm">
        <CommentIcon />
        {commentContent}
      </span>
    </div>
  );
}

export default PostButtons;
