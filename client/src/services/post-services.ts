import { api } from "@/services/api";
import { PostSummary } from "@/types/post";
import { getRange } from "@/utils/paginate";

export async function createPost(data: FormData, spacename: string) {
  const response = await api.post<{ data: string }>(
    `posts/new/${spacename}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function getSpacePosts(spacename: string, page: number) {
  const response = await api.get<{ data: PostSummary[] }>(
    `posts/${spacename}`,
    {
      params: { range: getRange(page, 10) },
    }
  );

  return response.data.data;
}

export async function getPosts(page: number) {
  const response = await api.get<{ data: PostSummary[] }>("posts", {
    params: { range: getRange(page, 10) },
  });

  return response.data.data;
}
