import PostSlider from "@/components/posts/PostSlider";
import { PostSummary } from "@/types/post";
import { timeSince } from "@/utils/timeSince";

type Props = {
  post: PostSummary;
};

function Post(props: Props) {
  const { post } = props;

  return (
    <li
      key={post.id}
      className="border-b border-gray-100 py-4 cursor-pointer hover:bg-gray-50"
    >
      <div className="flex items-center gap-2 wrapper">
        <img
          src={
            post.creator.avatar || `https://picsum.photos/seed/${post.id}/200`
          }
          alt="avatar"
          className="h-8 w-8 rounded-full "
        />

        <p className="font-bold text-[0.9rem] flex items-center gap-1 sm:text-base">
          t/{post.creator.display_name || post.creator.username}{" "}
          <span className="hidden font-normal text-[0.9rem] sm:block sm:text-base">
            @{post.creator.username}
          </span>
        </p>

        <p className="text-gray-500 text-[0.9rem] sm:text-base">
          {timeSince(new Date(post.created_at))}
        </p>
      </div>

      {/* HEADER & IMAGES */}
      <div className="wrapper flex flex-col gap-1 mt-2">
        <h2 className="font-bold text-[1.05rem] leading-snug  md:text-xl">
          {post.title}
        </h2>
        <p className="line-clamp-2">{post.body}</p>

        {post.tag && (
          <p
            style={{ backgroundColor: `${post.tag.colour}` }}
            className="font-medium w-fit text-white px-2 h-6 rounded-md flex items-center justify-center text-sm"
          >
            {post.tag.name}
          </p>
        )}

        {!!post.images.length && <PostSlider images={post.images} />}
      </div>
    </li>
  );
}

export default Post;
