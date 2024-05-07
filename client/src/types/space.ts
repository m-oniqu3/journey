export enum SpacePrivacy {
  Public = "public",
  Restricted = "restricted",
  Private = "private",
}

export type Space = {
  id: number;
  name: string;
  description: string;
  members_count: number;
  privacy_type: string;
  avatar: string;
  banner: string;
  created_at: string;
  creator: string;
};

export type UserSpaces = Record<
  string,
  { id: number; name: string; avatar: string; isCreator: boolean }
>;

export type SpaceSummary = {
  id: number;
  name: string;
  avatar: string;
  isCreator: boolean;
};

export type SpaceTag = {
  id: number;
  name: string;
  colour: string;
};
