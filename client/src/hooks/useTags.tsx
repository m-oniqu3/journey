import { getTagsForSpace } from "@/services/space-services";
import { SpaceTag } from "@/types/space";
import { handleError } from "@/utils/handleError";
import { useState } from "react";
import { useQuery } from "react-query";

function useTags(spacename: string) {
  const [tags, setTags] = useState<SpaceTag[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["tags", spacename],
    queryFn: () => fetchTags(spacename),
    onSuccess: (data) => setTags(data),
    onError: (error) => {
      console.log(error);
    },
  });

  async function fetchTags(name: string) {
    try {
      const response = await getTagsForSpace(name);
      console.log(response);
      return response;
    } catch (error) {
      const message = handleError(error);
      throw new Error(message);
    }
  }

  return { tags, isLoading };
}

export default useTags;
