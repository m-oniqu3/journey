import { CommentIcon, HeartIcon } from "@/components/icons";
import PostHeader from "@/components/posts/PostHeader";
import PostSlider from "@/components/posts/PostSlider";
import { PostSummary } from "@/types/post";

type Props = {
  post: PostSummary;
  headerType?: "space" | "user";
};

function Post(props: Props) {
  const { post, headerType = "user" } = props;

  const clamp = post.images.length ? "line-clamp-2" : "line-clamp-4";

  const spaceHeader = (
    <PostHeader
      avatar={post.space.avatar}
      createdAt={post.created_at}
      id={post.id}
      name={post.space.name}
      type="space"
    />
  );

  const userHeader = (
    <PostHeader
      avatar={post.creator.avatar}
      createdAt={post.created_at}
      id={post.id}
      name={post.creator.display_name || post.creator.username}
      username={post.creator.username}
      type="user"
    />
  );

  const header = headerType === "space" ? spaceHeader : userHeader;

  return (
    <li
      key={post.id}
      className="border-b border-gray-100 py-4 cursor-pointer hover:bg-gray-50 md:wrapper"
    >
      <>{header}</>

      {/* HEADER & IMAGES */}
      <div className="wrapper flex flex-col gap-1 mt-2">
        <h2 className="font-semibold text-dark text-[1.05rem] leading-snug line-clamp-3 sm:line-clamp-none sm:text-lg md:text-[1.4rem]">
          {post.title}
        </h2>

        {post.tag && (
          <p
            style={{ backgroundColor: `${post.tag.colour}` }}
            className="font-medium w-fit text-white px-3 my-1  h-6 rounded-full flex items-center justify-center text-sm"
          >
            {post.tag.name}
          </p>
        )}

        <p className={`${clamp} leading-relaxed`}>{post.body}</p>

        {!!post.images.length && <PostSlider images={post.images} />}
      </div>

      <div className="wrapper flex items-center gap-4 mt-4">
        <span className="flex items-center gap-2 text-dark font-semibold bg-grayscale-100  py-2 px-4 rounded-full">
          <HeartIcon />
          {Math.floor(Math.random() * 1000)}
        </span>

        <span className="flex items-center gap-2 text-dark font-semibold bg-grayscale-100  py-2 px-4 rounded-full">
          <CommentIcon />
          {Math.floor(Math.random() * 1000)}
        </span>
      </div>
    </li>
  );
}

export default Post;
