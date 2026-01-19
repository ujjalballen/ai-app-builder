"use server";

import database from "@/lib/db";
import { getSupabaseServer } from "@/lib/supabase/supabase-server";
import { success } from "zod";

export async function currentUser() {
    try {
        const supabase = await getSupabaseServer();
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {

            // we can return null;
            return {
                success: false,
                error: error.message
            }
        };

        return user;

    } catch (error) {
        console.error("Error to get the current user: ", error);
        return {
            success: false,
            error: "Faild to get the current user"
        };
    }
};


export async function onBoardUser() {
    try {
        const user = await currentUser();
        if (!user) {
            return {
                success: false,
                error: "Faild authenticated user found!"
            }
        };


        const { id, user_metadata } = user;
        const { name, email, avatar_url: avatarUrl } = user_metadata || {};

        const newUser = await database.user.upsert({
            where: {
                supabaseUserId: id
            },
            update: { name, avatarUrl }, // only updated the name and image_url
            create: {
                name: name,
                email: email,
                image_url: avatarUrl,
                supabaseUserId: id
            }
        })

        return {
            success: true,
            user: newUser,
            message: "User onBoarded successfully"
        }

    } catch (error) {
        console.error("Error onBoarding user: ", error);
        return {
            success: false,
            error: "Faild to onBarding user"
        }
    }
}

export async function getCurrentSingelUser() {
    try {
        const user = await currentUser();
        if (!user) {
            return {
                success: false,
                error: "Faild authenticated user found!"
            }
        };

        const dbUser = await database.user.findUnique({
            where: {
                supabaseUserId: user.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                image_url: true,
                supabaseUserId: true
            }
        });

        return {
            success: true,
            user: dbUser
        }

    } catch (error) {
        console.error("Error to get singelUser");
        return {
            success: false,
            error: "Faild to get singel user"
        }
    }
}