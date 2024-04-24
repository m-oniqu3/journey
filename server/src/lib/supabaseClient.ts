import { Database } from "@/lib/database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SERVER_SUPABASE_PROJECT_URL as string;
const supabaseKey = process.env.SERVER_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
