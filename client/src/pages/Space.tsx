import SpaceHeader from "@/components/space/SpaceHeader";
import SpaceSidebar from "@/components/space/SpaceSidebar";
import SpacesContent from "@/components/space/SpacesContent";
import { getSpace } from "@/services/space-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "@tanstack/react-query";
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
  if (!isLoading && isError)
    return <div>Error: {(error as Error).message}</div>;

  if (!isLoading && !data) return <div>Space not found</div>;

  if (!data) return <div>Space not found</div>;

  const space = {
    id: data.id,
    name: data.name,
    avatar: data.avatar,
    members_count: data.members_count,
    banner: data.banner,
  };
  return (
    <div className="w-full">
      <SpaceHeader space={space} />

      <div className="md:wrapper page-layout">
        <div className="main-content ">
          <SpacesContent name={spaceName} />
        </div>

        <div className="sidebar md:wrapper ">
          <SpaceSidebar name={spaceName} />
        </div>
      </div>
    </div>
  );
}

export default Space;
