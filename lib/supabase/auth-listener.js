'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function AuthListener() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // This starts the listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      
      if (event === 'SIGNED_IN') {
        // Optional: User just logged in (e.g. via Magic Link), refresh data
        router.refresh()
      }

      if (event === 'SIGNED_OUT') {
        // User logged out (in this tab OR another tab)
        // Clear any local client state if you have it
        router.refresh() // clear server component cache
        router.replace('/login') // force redirect
      }
    })

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return null // This component doesn't render anything visible
}