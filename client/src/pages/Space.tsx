import SpaceHeader from "@/components/space/SpaceHeader";
import { getSpace } from "@/services/space-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function Space() {
  const { spaceName } = useParams() as { spaceName: string };

  const { error, isError, isLoading, data } = useQuery({
    queryKey: ["space", spaceName],
    queryFn: () => getSpaceDetails(spaceName),
    retry: false,
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

  if (!isLoading && !data) return <div>Space not found</div>;

  const space = {
    id: data.id,
    name: data.name,
    avatar: data.avatar,
    members_count: data.members_count,
    banner: data.banner,
  };
  return (
    <div>
      <SpaceHeader space={space} />

      <div className="wrapper page-layout">
        <div className="main-content bg-green-200"> main content </div>

        <div className="sidebar bg-green-400"> sidebar </div>
      </div>
    </div>
  );
}

export default Space;
