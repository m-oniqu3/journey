import LoadingBar from "@/components/LoadingBar";
import PostButtons from "@/components/posts/PostButtons";
import PostHeader from "@/components/posts/PostHeader";
import PostSlider from "@/components/posts/PostSlider";
import { getPostById } from "@/services/post-services";
import { PostSummary } from "@/types/post";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  post: PostSummary;
  headerType?: "space" | "user";
};

function Post(props: Props) {
  const { post, headerType = "user" } = props;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isPrefetching, setIsPrefetching] = useState(false);

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
      avatar={post.creator?.avatar || ""}
      createdAt={post.created_at}
      id={post.id}
      name={post.creator?.display_name || post.creator?.username || ""}
      username={post.creator?.username || ""}
      type="user"
    />
  );

  const titleSlug = post.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .split("_")
    .slice(0, 7)
    .join("_");

  const route = `/s/${post.space.name}/${post.id}/${titleSlug}`;

  const postHeader = headerType === "space" ? spaceHeader : userHeader;

  async function handleNavigateToPost() {
    await prefetchPost();
    navigate(route);
  }

  async function prefetchPost() {
    setIsPrefetching(true);

    // The results of this query will be cached like a normal query
    await queryClient.prefetchQuery({
      queryKey: ["post", post.id],
      queryFn: fetchPost,
    });

    setIsPrefetching(false);
  }

  // todo - add try catch
  async function fetchPost() {
    const response = await getPostById(post.id);
    return response;
  }

  return (
    <>
      <div
        key={post.id}
        className="border-b border-gray-100 py-4  hover:bg-gray-50 md:wrapper"
      >
        <>{postHeader}</>

        <div className="wrapper flex flex-col gap-1 mt-2">
          <Link
            to=""
            onMouseDown={handleNavigateToPost}
            className="cursor-pointer font-semibold text-dark text-[1.05rem] leading-snug 
            line-clamp-3 sm:line-clamp-none sm:text-lg md:text-[1.4rem]"
          >
            {post.title}
          </Link>

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

          <PostButtons postID={post.id} postLikes={post.likes} />
        </div>
      </div>

      {isPrefetching && <LoadingBar />}
    </>
  );
}

export default Post;
