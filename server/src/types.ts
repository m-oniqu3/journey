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
