import { api } from "@/services/api";
import { Comment, NewComment } from "@/types/comment";
import { getRange } from "@/utils/paginate";

export async function createComment(comment: NewComment) {
  const response = await api.post<{ data: string }>("comments", comment);
  return response.data.data;
}

export async function getCommentsForPost(postID: number, page: number) {
  const response = await api.get<{ data: Comment[] }>(
    `comments/post/${postID}`,
    {
      params: {
        range: getRange(page, 10),
      },
    }
  );

  return response.data.data;
}

export async function getRepliesForComment(
  commentID: number,
  postID: number,
  page: number
) {
  const response = await api.get<{ data: Comment[] }>(
    `comments/replies/${commentID}`,
    {
      params: {
        postID,
        range: getRange(page, 3),
      },
    }
  );
  return response.data.data;
}

export async function getCommentsCount(postID: number) {
  const response = await api.get<{ data: number }>(`comments/count/${postID}`);
  return response.data.data;
}

export async function getAuthoredComments(page: number) {
  const response = await api.get<{ data: string }>("comments/authored", {
    params: {
      range: getRange(page, 10),
    },
  });
  return response.data.data;
}
