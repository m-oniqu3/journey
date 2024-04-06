import { api } from "@/services/api";
import { User } from "@/types/auth";

type LoginResponse = {
  user: User;
  token: { access_token: string; expiry: string };
};

export async function login(credentials: { email: string; password: string }) {
  const response = await api.post<{ data: LoginResponse }>("auth", credentials);
  return response.data.data;
}
