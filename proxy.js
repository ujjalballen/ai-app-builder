import { NextResponse } from 'next/server'
import { updateSession } from './lib/supabase/supabase-proxy'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {

    return await updateSession(request)

}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  // ... your config matcher
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}