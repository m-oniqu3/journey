import { api } from "@/services/api";
import { SpaceType } from "@/types/space";

export async function createSpace(data: {
  name: string;
  type: SpaceType;
  userID: string;
}) {
  const response = await api.post<{ data: string }>("spaces/new", data);
  return response.data;
}
