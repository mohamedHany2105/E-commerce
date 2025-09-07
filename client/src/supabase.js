
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://uifqnenvbpazlwmaalgj.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZnFuZW52YnBhemx3bWFhbGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NTk0NjUsImV4cCI6MjA3MTEzNTQ2NX0.PWN4jgF68POozXRZ_WAIA2GvqsQbQ5L6w2VoWsxD_wA";
export const supabase = createClient(supabaseUrl, supabaseKey);
        