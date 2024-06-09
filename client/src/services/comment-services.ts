import { api } from "@/services/api";
import { Comment, NewComment } from "@/types/comment";
import { getRange } from "@/utils/paginate";

export async function createComment(comment: NewComment) {
  const response = await api.post<{ data: string }>("comments", comment);
  return response.data.data;
}

export async function getCommentsForPost(postID: number) {
  const response = await api.get<{ data: Comment[] }>(`comments/${postID}`);
  return response.data.data;
}

export async function getRepliesForComment(commentID: number, postID: number) {
  const response = await api.get<{ data: Comment[] }>(
    `comments/replies/${commentID}`,
    {
      params: {
        postID,
        range: getRange(0, 3),
      },
    }
  );
  return response.data.data;
}
