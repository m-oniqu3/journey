type ProfileSummaryForPost = {
  user_id: string;
  username: string;
  display_name: string;
  avatar: string;
};

export type Tag = {
  id: number;
  name: string;
  colour: string;
};

export type PostSummary = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  images: { id: number; url: string }[];
  tag: Tag | null;
  creator: ProfileSummaryForPost;
};
