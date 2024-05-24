import { CommentIcon, HeartIcon } from "@/components/icons";

type Props = {
  postID: number;
  postLikes: number;
};

function PostButtons(props: Props) {
  return (
    <div className=" flex items-center gap-4 mt-4">
      <span className="flex items-center gap-2 text-dark font-semibold bg-grayscale-100  py-2 px-4 rounded-full">
        <HeartIcon />
        {props.postLikes}
      </span>

      <span className="flex items-center gap-2 text-dark font-semibold bg-grayscale-100  py-2 px-4 rounded-full">
        <CommentIcon />
        {Math.floor(props.postID * 14)}
      </span>
    </div>
  );
}

export default PostButtons;