import { api } from "@/services/api";

export async function createPost(data: FormData, spacename: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.post<{ data: any }>(
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
