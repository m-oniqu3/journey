import Post from "@/components/posts/Post";
import { getSpacePosts } from "@/services/post-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "react-query";

type Props = {
  name: string;
};

function SpacesContent(props: Props) {
  const { error, isError, data, isLoading } = useQuery({
    queryKey: ["space-posts", props.name],
    queryFn: () => getSpacePost(props.name),
    retry: false,
  });

  async function getSpacePost(name: string) {
    try {
      const response = await getSpacePosts(name, 0);
      console.log(response);

      return response;
    } catch (error) {
      const message = handleError(error);

      throw new Error(message);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!data) {
    return <div>No posts found</div>;
  }

  const renderedPosts = data.map((post) => {
    return <Post post={post} key={post.id} />;
  });

  return (
    <div className="w-full">
      <ul className="flex flex-col border-t border-gray-100 py-4 md:wrapper ">
        {renderedPosts}
      </ul>
    </div>
  );
}

export default SpacesContent;
