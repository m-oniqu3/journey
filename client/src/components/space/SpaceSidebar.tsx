import { getSpace } from "@/services/space-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "react-query";

type Props = {
  name: string;
};

function SpaceSidebar(props: Props) {
  const { error, isError, isLoading, data } = useQuery({
    queryKey: ["space", props.name],
    queryFn: () => getSpaceDetails(props.name),
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

  return (
    <aside className="bg-gray-50 p-4 rounded-lg">
      {isLoading && <div>Loading...</div>}

      {!isLoading && isError && <div>Error: {(error as Error).message}</div>}

      {!isLoading && !data && <div>Space not found</div>}

      {!isLoading && data && (
        <section className="space-y-2">
          <h2 className="font-bold text-lg">journey to {data.name}</h2>
          <p className="leading-relaxed font-medium text-gray-500">
            {data.description ||
              `welcome to the ${data.name} space! this is a space for ${data.name} enthusiasts to share their knowledge and experiences.`}
          </p>

          <p className="flex gap-2">
            <strong>{data.members_count}</strong>
            {data.members_count === 1 ? "member" : "members"}
          </p>
        </section>
      )}
    </aside>
  );
}

export default SpaceSidebar;
