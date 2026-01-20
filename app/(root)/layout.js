import { getSupabaseServer } from "@/lib/supabase/supabase-server";
import { onBoardUser } from "@/modules/auth/actions"
import { NavBar } from "@/modules/home/components/navbar";

export default async function CommonLayout({ children }) {
    // await onBoardUser();

    const supabase = await getSupabaseServer();

    const { data: { user }, error } = await supabase.auth.getUser();

    return (
        <div className="flex flex-col min-h-screen relative overflow-x-hidden">

            <NavBar user={user?.user_metadata} />
            <div
                className="fixed inset-0 -z-10 h-full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] [background-size:16px_16px]"
            />
            <div className='flex-1 w-full mt-20'>
                {children}
            </div>
        </div>
    )
}