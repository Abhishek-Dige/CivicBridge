import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qtxzgsulaxupytgmzisy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0eHpnc3VsYXh1cHl0Z216aXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMDk2NjksImV4cCI6MjA4ODg4NTY2OX0.F0o2t2snlfMJm-osGx6Qir1UA6Kg3zmM2EEf9oTrVWA"
);

export default supabase;