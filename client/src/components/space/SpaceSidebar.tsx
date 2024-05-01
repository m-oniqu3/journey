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
          <h2 className="font-bold text-xl">journey to {data.name}</h2>
          <p className="leading-relaxed">
            {data.description ||
              `Welcome to the ${data.name} community! Whether you've explored out bustling streets, hiked through our rainforests, or soaked up Bahia's sunny beaches, this is the place to share your adventures and travel tips. Join fellow enthusiasts, inspire others with your stories, and immerse yourself in the vibrant culture and natural beauty of Brazil. Let's celebrate the magic of this incredible country together! 🌴`}
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
