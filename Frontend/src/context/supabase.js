import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qtxzgsulaxupytgmzisy.supabase.co",
  "sb_publishable_q8aorojFIxupnhd3lUKoAA_W5cf4PHL"
);

export default supabase;