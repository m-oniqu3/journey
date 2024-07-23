import { getAuthoredComments } from "@/services/comment-services";
import { handleError } from "@/utils/handleError";

async function fetchProfileComments() {
  try {
    const response = await getAuthoredComments(0);
    console.log(response);
  } catch (error) {
    const message = handleError(error);
    throw new Error(message);
  }
}

function ProfileComments() {
  fetchProfileComments()
    .then(() => console.log("Fetched profile comments"))
    .catch((error) => console.error(error));
  return <div>ProfileComments</div>;
}

export default ProfileComments;
