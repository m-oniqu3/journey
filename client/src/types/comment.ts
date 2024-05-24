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
};
