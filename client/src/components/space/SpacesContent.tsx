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

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && <div>Error: {(error as Error).message}</div>}

      {!isLoading && !data && <div>No posts found</div>}

      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default SpacesContent;
