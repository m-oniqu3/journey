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

  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
}

export default Explore;
