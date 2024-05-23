import { getTagsForSpace } from "@/services/space-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "@tanstack/react-query";

function useTags(spacename: string) {
  const { isLoading, data } = useQuery({
    queryKey: ["tags", spacename],
    queryFn: () => fetchTags(spacename),
  });

  async function fetchTags(name: string) {
    try {
      if (!name) return [];

      const response = await getTagsForSpace(name);
      console.log(response);
      return response;
    } catch (error) {
      const message = handleError(error);
      throw new Error(message);
    }
  }

  const tags = data ?? [];

  return { tags, isLoading };
}

export default useTags;
