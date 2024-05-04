import { createSpace } from "@/controllers/spaces/create-space";
import { joinSpace } from "@/controllers/spaces/join-space";
import { leaveSpace } from "@/controllers/spaces/leave-space";

import * as spaces from "@/controllers/spaces/get-space";

export default {
  createSpace,
  getAllSpaces: spaces.getAllSpaces,
  getSpaceDetails: spaces.getSpaceDetails,
  getUsersSpaces: spaces.getUsersSpaces,
  joinSpace,
  leaveSpace,
};
