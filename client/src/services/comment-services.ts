import { api } from "@/services/api";
import { NewComment } from "@/types/comment";

export async function createComment(comment: NewComment) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.post<{ data: any }>("comments", comment);
  return response.data.data;
}
