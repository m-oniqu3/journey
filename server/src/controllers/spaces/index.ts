import { createSpace } from "@/controllers/spaces/create-space";
import { getTagsForSpace } from "@/controllers/spaces/get-tags";
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
  getTagsForSpace,
};
