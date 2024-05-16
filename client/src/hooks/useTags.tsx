import { getTagsForSpace } from "@/services/space-services";
import { SpaceTag } from "@/types/space";
import { handleError } from "@/utils/handleError";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function useTags(spacename: string) {
  const [tags, setTags] = useState<SpaceTag[]>([]);

  const { isLoading, data } = useQuery({
    queryKey: ["tags", spacename],
    queryFn: () => fetchTags(spacename),
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

  if (!data) setTags([]);

  if (data) {
    setTags(data);
  }

  return { tags, isLoading };
}

export default useTags;
