export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export type ProfileSummaryForPost = {
  user_id: string;
  username: string;
  display_name: string;
  avatar: string;
};

export type ProfileRecord = {
  [profileID: string]: ProfileSummaryForPost;
};

export type UniquePosts = {
  [postID: number]: {
    id: number;
    title: string;
    spaces: {
      id: number;
      name: string;
      avatar: string | null;
    } | null;
  };
};

export type UniqueReplies = Record<
  number,
  {
    id: number;
    commentBeingRepliedTo: string;
    post_id: number;
    user: {
      username: string;
      display_name: string | null;
      user_id: string;
    };
  }
>;
