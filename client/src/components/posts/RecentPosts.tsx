import LoadingSpinner from "@/components/LoadingSpinner";
import { getRecentPosts } from "@/services/post-services";
import { RecentPost } from "@/types/post";
import { handleError } from "@/utils/handleError";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

async function fetchRecentPosts() {
  try {
    const response = await getRecentPosts();
    return response;
  } catch (error) {
    const message = handleError(error);
    throw new Error(message);
  }
}

function RecentPosts() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["recent-posts"],
    queryFn: fetchRecentPosts,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const renderContent = (() => {
    if (isLoading) return <LoadingSpinner />;

    if (isError) return <div>Error: {error.message}</div>;

    if (!data) return <div>Post not found</div>;

    return data.map((post: RecentPost, index) => {
      const titleSlug = post.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .split("_")
        .slice(0, 7)
        .join("_");

      const route = `/s/${post.space.name}/${post.id}/${titleSlug}`;

      return (
        <li
          className={`p-4  border-gray-200 ${
            index === data.length - 1 ? "" : "border-b-[1px]"
          }`}
          key={post.id}
        >
          <figure className="flex items-center gap-2 mb-3">
            <img
              src={
                post.space.avatar ||
                `https://picsum.photos/seed/${post.space.id}/200`
              }
              alt="avatar"
              className="avatar w-7 h-7"
            />

            <figcaption className="text-gray-500 text-sm underline-offset-2 hover:underline">
              <Link to={`/s/${post.space.name}`}>s/{post.space.name}</Link>
            </figcaption>
          </figure>

          <Link
            to={route}
            className="font-medium text-[1.1rem] text-gray-600 leading-tight underline-offset-2 hover:underline"
          >
            {post.title}
          </Link>

          <p className="flex gap-2 text-gray-500 mt-1">
            <span className="text-sm">
              {post.likes} {post.likes === 1 ? "like" : "likes"}
            </span>
            <span className="text-sm">{post.title.length} comments</span>
          </p>
        </li>
      );
    });
  })();

  return (
    <aside className="bg-gray-50 rounded-xl ">
      <header className="flex items-center justify-between mb-4 px-4 pt-4">
        <h2 className="text-lg text-gray-600 font-medium">Recent Posts</h2>
        <p className="text-gray-500">Clear</p>
      </header>

      <ul>{renderContent}</ul>
    </aside>
  );
}

export default RecentPosts;
