import { api } from "@/services/api";
import {
  Space,
  SpacePrivacy,
  SpaceSummary,
  SpaceTag,
  type UserSpaces,
} from "@/types/space";

export async function createSpace(data: {
  name: string;
  type: SpacePrivacy;
  userID: string;
}) {
  const response = await api.post<{ data: SpaceSummary }>("spaces/new", data);
  return response.data.data;
}

export async function getSpace(name: string) {
  const response = await api.get<{ data: Space }>(`spaces/${name}`);
  return response.data.data;
}

export async function getAllSpaces() {
  const response = await api.get<{ data: Space[] }>("spaces");
  return response.data.data;
}

export async function getUsersSpaces(userID: string) {
  const response = await api.get<{ data: UserSpaces }>(`spaces/user/${userID}`);
  return response.data.data;
}

export async function joinSpace(space: string, userID: string) {
  const response = await api.post<{ data: SpaceSummary }>(
    `spaces/join/${space}`,
    { userID }
  );
  return response.data.data;
}

export async function leaveSpace(space: string, userID: string) {
  const response = await api.post<{ data: string }>(`spaces/leave/${space}`, {
    userID,
  });
  return response.data;
}

export async function getTagsForSpace(space: string) {
  const response = await api.get<{ data: SpaceTag[] }>(`spaces/tags/${space}`);
  return response.data.data;
}
