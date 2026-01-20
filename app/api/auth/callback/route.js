import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { getSupabaseServer } from '@/lib/supabase/supabase-server'
import { onBoardUser } from '@/modules/auth/actions'

export async function GET(request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    let next = searchParams.get('next') ?? '/'
    if (!next.startsWith('/')) {
        // if "next" is not a relative URL, use the default
        next = '/'
    }

    if (code) {
        const supabase = await getSupabaseServer()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {

            // 2. CHECK: Only run if we have a valid session user
            if (data?.session?.user) {

                //METHOD 01: => We use upsert to ensure we don't crash if the user already exists
                /*             await prisma.user.upsert({
                                where: { id: session.user.id },
                                update: {
                                    email: session.user.email,
                                    // Update avatar/name in case they changed on Google
                                    name: session.user.user_metadata.full_name,
                                    avatarUrl: session.user.user_metadata.avatar_url,
                                },
                                create: {
                                    id: session.user.id,
                                    email: session.user.email,
                                    name: session.user.user_metadata.full_name,
                                    avatarUrl: session.user.user_metadata.avatar_url,
                                },
                            }) */

                // METHOD 02: => Using Server Action
                console.log("Session verified. Syncing with database...")

                const result = await onBoardUser();

                if (!result.success) {
                    console.error("Onboarding failed:", result.error)
                    // You might want to redirect to a specific error page here
                    // or just let them through and try to fix it later.
                }

            }


            // --- 2. THEN REDIRECT ---
            const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        };


    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}