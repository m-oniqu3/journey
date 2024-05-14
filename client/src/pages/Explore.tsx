import Post from "@/components/posts/Post";
import { getPosts } from "@/services/post-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "react-query";

function Explore() {
  const { isError, error, isLoading, data } = useQuery({
    queryKey: "explore",
    queryFn: fetchExplorePosts,
  });

  async function fetchExplorePosts() {
    try {
      const response = await getPosts(0);
      console.log(response);
      return response;
    } catch (error) {
      const message = handleError(error);

      console.error(message);

      throw new Error(message);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{(error as Error).message}</div>;
  }

  if (!data) {
    return <div>No posts found</div>;
  }

  const renderedPosts = data.map((post) => {
    return <Post post={post} key={post.id} headerType="space" />;
  });

  return (
    <>
      <div className="page-layout">
        <ul className="main-content flex flex-col border-t border-gray-100 py-4 md:wrapper ">
          {renderedPosts}
        </ul>

        <div className="sidebar">recommended spaces</div>
      </div>
    </>
  );
}

export default Explore;
