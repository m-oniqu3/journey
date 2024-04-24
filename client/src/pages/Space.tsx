import { getSpace } from "@/services/space-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function Space() {
  const { spaceName } = useParams() as { spaceName: string };

  const { error, isError, isLoading, data } = useQuery({
    queryKey: ["space", spaceName],
    queryFn: () => getSpaceDetails(spaceName),
    retry: 1,
  });

  async function getSpaceDetails(name: string) {
    try {
      const response = await getSpace(name);
      return response;
    } catch (error) {
      const message = handleError(error);

      throw new Error(message);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (!isLoading && isError && error)
    return <div>Error: {(error as Error).message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}

export default Space;