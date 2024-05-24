import { api } from "@/services/api";
import { Comment, NewComment } from "@/types/comment";

export async function createComment(comment: NewComment) {
  const response = await api.post<{ data: string }>("comments", comment);
  return response.data.data;
}

export async function getCommentsForPost(postID: number) {
  const response = await api.get<{ data: Comment[] }>(`comments/${postID}`);
  return response.data.data;
}
