import { CommentIcon, HeartIcon, HorizonalEllipsis } from "@/components/icons";
import PostSlider from "@/components/posts/PostSlider";
import { PostSummary } from "@/types/post";
import { timeSince } from "@/utils/timeSince";

type Props = {
  post: PostSummary;
};

function Post(props: Props) {
  const { post } = props;

  const clamp = post.images.length ? "line-clamp-2" : "line-clamp-4";

  return (
    <li
      key={post.id}
      className="border-b border-gray-100 py-4  cursor-pointer hover:bg-gray-50"
    >
      <div className="flex items-center gap-2 wrapper">
        <img
          src={
            post.creator.avatar || `https://picsum.photos/seed/${post.id}/200`
          }
          alt="avatar"
          className="h-8 w-8 rounded-full "
        />

        <p className="font-bold text-gray-600 text-[0.9rem] flex items-center gap-1 sm:text-sm">
          t/{post.creator.display_name || post.creator.username}
          <span className="hidden font-normal text-[0.9rem] sm:block sm:text-sm">
            @{post.creator.username}
          </span>
        </p>

        <p className="text-gray-600 text-[0.9rem] sm:text-sm">
          {timeSince(new Date(post.created_at))} ago
        </p>

        <span className="ml-auto cursor-pointer  p-1 rounded-full hover:bg-gray-50">
          <HorizonalEllipsis />
        </span>
      </div>

      {/* HEADER & IMAGES */}
      <div className="wrapper flex flex-col gap-1 mt-2">
        <h2 className="font-bold text-dark text-[1.05rem] leading-snug sm:text-lg">
          {post.title}
        </h2>

        {post.tag && (
          <p
            style={{ backgroundColor: `${post.tag.colour}` }}
            className="font-medium w-fit text-white px-2 h-6 rounded-md flex items-center justify-center text-sm"
          >
            {post.tag.name}
          </p>
        )}

        <p className={`${clamp}`}>{post.body}</p>

        {!!post.images.length && <PostSlider images={post.images} />}
      </div>

      <div className="wrapper flex items-center gap-4 mt-2">
        <span className="flex items-center gap-2 text-gray-600 font-semibold bg-gray-100 py-1 px-4 rounded-lg">
          <HeartIcon />
          {Math.floor(Math.random() * 1000)}
        </span>

        <span className="flex items-center gap-2 text-gray-600 font-semibold bg-gray-100 py-1 px-4 rounded-lg">
          <CommentIcon />
          {Math.floor(Math.random() * 1000)}
        </span>
      </div>
    </li>
  );
}

export default Post;
