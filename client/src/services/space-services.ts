import { api } from "@/services/api";
import { Space, SpacePrivacy, type UserSpaces } from "@/types/space";

export async function createSpace(data: {
  name: string;
  type: SpacePrivacy;
  userID: string;
}) {
  const response = await api.post<{ data: string }>("spaces/new", data);
  return response.data;
}

export async function getSpace(name: string) {
  const response = await api.get<{ data: Space }>(`spaces/${name}`);
  return response.data.data;
}

export async function getUsersSpaces(userID: string) {
  const response = await api.get<{ data: UserSpaces }>(`spaces/user/${userID}`);
  return response.data.data;
}
