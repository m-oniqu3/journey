import { User } from "@supabase/supabase-js";

declare global {
  namespace Express {
    interface Request {
      user: User | null;
      locals: {
        [key: string]: any;
      };
    }
  }
}
