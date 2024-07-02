import { api } from "@/services/api";
import { PostSummary, RecentPost } from "@/types/post";
import { getRange } from "@/utils/paginate";

/**
 *
 * @param data FormData - title, body, tag, images
 * @param spacename string
 * @description Create a new post
 * @returns { data: string }
 */
export async function createPost(data: FormData, spacename: string) {
  const response = await api.post<{ data: number }>(
    `posts/new/${spacename}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
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

/**
 * @param page number
 * @description Get posts for spaces that the user is a member of
 * @returns PostSummary[]
 */
export async function getPostsForJoinedSpaces(page: number) {
  const response = await api.get<{ data: PostSummary[] }>("posts/joined", {
    params: { range: getRange(page, 10) },
  });

  return response.data.data;
}

/**
 *
 * @param postID number
 * @description Add a post to recent posts
 * @returns string
 */

export async function addRecentPost(postID: number) {
  const response = await api.post<{ data: string }>("posts/recent", {
    postID,
  });

  return response.data.data;
}

export async function getRecentPosts() {
  const response = await api.get<{ data: RecentPost[] }>("posts/recent");
  return response.data.data;
}

export async function clearRecentPosts() {
  const response = await api.delete<{ data: string }>("posts/recent");
  return response.data.data;
}
