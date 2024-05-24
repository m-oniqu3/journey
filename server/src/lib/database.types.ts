export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          comment: string
          created_at: string
          id: number
          is_edited: boolean | null
          post_id: number
          reply_id: number | null
          user_id: string
        }
        Insert: {
          comment?: string
          created_at?: string
          id?: number
          is_edited?: boolean | null
          post_id: number
          reply_id?: number | null
          user_id?: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: number
          is_edited?: boolean | null
          post_id?: number
          reply_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      images: {
        Row: {
          created_at: string
          id: number
          post_id: number
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: number
          url?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          body: string | null
          created_at: string
          creator: string | null
          id: number
          isEdited: boolean | null
          likes: number | null
          space_id: number
          tag_id: number | null
          title: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          creator?: string | null
          id?: number
          isEdited?: boolean | null
          likes?: number | null
          space_id: number
          tag_id?: number | null
          title?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          creator?: string | null
          id?: number
          isEdited?: boolean | null
          likes?: number | null
          space_id?: number
          tag_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          banner: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          user_id: string
          username: string
        }
        Insert: {
          avatar?: string | null
          banner?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          user_id: string
          username?: string
        }
        Update: {
          avatar?: string | null
          banner?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          avatar: string | null
          banner: string | null
          created_at: string
          creator: string | null
          description: string | null
          id: number
          members_count: number | null
          name: string
          privacy_type: string | null
        }
        Insert: {
          avatar?: string | null
          banner?: string | null
          created_at?: string
          creator?: string | null
          description?: string | null
          id?: number
          members_count?: number | null
          name?: string
          privacy_type?: string | null
        }
        Update: {
          avatar?: string | null
          banner?: string | null
          created_at?: string
          creator?: string | null
          description?: string | null
          id?: number
          members_count?: number | null
          name?: string
          privacy_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_spaces_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          colour: string
          created_at: string
          id: number
          name: string
          space_id: number | null
          user_id: string
        }
        Insert: {
          colour?: string
          created_at?: string
          id?: number
          name?: string
          space_id?: number | null
          user_id?: string
        }
        Update: {
          colour?: string
          created_at?: string
          id?: number
          name?: string
          space_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      "user-spaces": {
        Row: {
          created_at: string
          id: number
          space_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          space_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          space_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user-spaces_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user-spaces_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
