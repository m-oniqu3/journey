import { api } from "@/services/api";
import { PostSummary } from "@/types/post";
import { getRange } from "@/utils/paginate";

/**
 *
 * @param data FormData - title, body, tag, images
 * @param spacename string
 * @description Create a new post
 * @returns { data: string }
 */
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

/**
 *
 * @param spacename string
 * @param page number
 * @description Get posts for a space
 * @returns PostSummary[]
 */
export async function getSpacePosts(spacename: string, page: number) {
  const response = await api.get<{ data: PostSummary[] }>(
    `posts/space/${spacename}`,
    {
      params: { range: getRange(page, 10) },
    }
  );

  return response.data.data;
}

/**
 *
 * @param page number
 * @description Get all posts
 * @returns PostSummary[]
 */
export async function getPosts(page: number) {
  const response = await api.get<{ data: PostSummary[] }>("posts", {
    params: { range: getRange(page, 10) },
  });

  return response.data.data;
}

/**
 *
 * @param id number
 * @description Get post by id
 * @returns PostSummary - post details, creator details, tags, images and space details for a post
 */
export async function getPostById(id: number) {
  const response = await api.get<{ data: PostSummary }>(`posts/post/${id}`);

  return response.data.data;
}
