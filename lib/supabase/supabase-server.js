import { cookies } from "next/headers";
import { getSupabaseConfig } from "./supabase-config";
import { createServerClient } from "@supabase/ssr";

export async function getSupabaseServer() {
    const { supabaseUrl, supabaseKey } = getSupabaseConfig();
    const cookieStore = await cookies()

    return createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));


                } catch (error) {
                    // The `setAll` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            }
        }
    })

}