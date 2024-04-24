import { isAxiosError } from "axios";

export function handleError(error: unknown) {
  let message = "";

  if (isAxiosError(error)) {
    if (error.response) {
      message = error.response.data?.error || error.response;
    }
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = "Something went wrong. Could not get space details";
  }
  console.log("Error message:", message);

  return message;
}
