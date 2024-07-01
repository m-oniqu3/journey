import { CommentIcon, HeartIcon } from "@/components/icons";
import { getCommentsCount } from "@/services/comment-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "@tanstack/react-query";
import { VscLoading } from "react-icons/vsc";

type Props = {
  postID: number;
  postLikes: number;
};

function PostButtons(props: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["commentsCount", props.postID],
    queryFn: () => fetchCommentsCount(props.postID),
  });

  async function fetchCommentsCount(postID: number) {
    try {
      const response = await getCommentsCount(postID);
      return response;
    } catch (error) {
      const message = handleError(error);
      console.error("Error getting comments count for post:", message);
      return 0;
    }
  }

  const commentContent = (() => {
    if (isLoading) {
      return <VscLoading className="animate-spin w-4 h-4" />;
    }

    if (error) {
      return 0;
    }

    return data;
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
