"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthButton() {
    const supabase = createClientComponentClient();
    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3001/auth/callback'
            }
        })
    }
    const handleSignOut = async () => {
        await supabase.auth.signOut()
    }

    return (
        <>
            <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
                onClick={handleSignIn}>
                Login with Github
            </button>
            <button className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150"
                onClick={handleSignOut}>
                Logout
            </button>
        </>
    )
}