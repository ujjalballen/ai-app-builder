import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./supabase-config";

let supabase;

export function getSupabaseBrowserClient() {

    if (supabase) return supabase;

    const { supabaseUrl, supabaseKey } = getSupabaseConfig();

    supabase = createBrowserClient(supabaseUrl, supabaseKey);

    return supabase;

}