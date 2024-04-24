import { isAxiosError } from "axios";

export function handleError(error: unknown) {
  let message = "";
  console.log("Handle Error:", error);

  if (isAxiosError(error)) {
    if (error.response) {
      message = error.response.data?.error || error.response;
    }
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = "Something went wrong. Could not get space details";
  }

  return message;
}
