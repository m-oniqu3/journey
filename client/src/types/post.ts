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
  likes: number;
  images: { id: number; url: string }[];
  tag: Tag | null;
  creator?: ProfileSummaryForPost;
  space: { id: number; name: string; avatar: string };
};

export type FeedPost = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  likes: number;
  images: { id: number; url: string }[];
  tag: { name: string; id: number; colour: string };
  space: { id: number; name: string; avatar: string | null };
}[];

export type RecentPost = {
  id: number;
  title: string;
  likes: number;
  space: { id: number; name: string; avatar: string | null };
};
