export type NewComment = {
  content: string;
  postID: number;
  userID: string;
};

export type Comment = {
  id: number;
  comment: string;
  post_id: number;
  reply_id: number | null;
  user_id: string;
  created_at: string;
  is_edited: boolean;
  repliesCount: number;
  creator: {
    username: string;
    avatar: string;
    display_name: string;
    user_id: string;
  };
};

type Reply = {
  id: number;
  body: string;
  post_id: number;
  user: {
    username: string;
    display_name: string | null;
    user_id: string;
  };
};

// type for authored comments
export type AuthoredComments = {
  user: {
    username: string;
    display_name: string | null;
    user_id: string;
  };
  comments: {
    id: number;
    body: string;
    created_at: string;
    post: {
      id: number;
      title: string;
      spaces: {
        id: number;
        name: string;
        avatar: string | null;
      };
    };
    repliedTo: Reply | null;
  }[];
};
