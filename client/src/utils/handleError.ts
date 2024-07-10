import { isAxiosError } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleError(error: any) {
  let message = "";

  console.log("Error from handle error:", error);

  if (isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 403) {
        message = "This session has expired. Please log in again.";
        return message;
      }

      message =
        error.response.data?.error || error.response
          ? error.response.data.message || "Something went wrong. "
          : "Something went wrong. ";

      return message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  } else if ("data" in error) {
    message = error.data.message;
  } else {
    message = "Something went wrong. ";
  }

  console.log("Error message:", message);

  return message;
}
