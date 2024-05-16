import { CommentIcon, HeartIcon } from "@/components/icons";

type Props = {
  postID: number;
};

function PostButtons(props: Props) {
  return (
    <div className=" flex items-center gap-4 mt-4">
      <span className="flex items-center gap-2 text-dark font-semibold bg-grayscale-100  py-2 px-4 rounded-full">
        <HeartIcon />
        {props.postID * 1080}
      </span>

      <span className="flex items-center gap-2 text-dark font-semibold bg-grayscale-100  py-2 px-4 rounded-full">
        <CommentIcon />
        {Math.floor(props.postID * 1440)}
      </span>
    </div>
  );
}

export default PostButtons;
