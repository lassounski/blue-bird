import { redirect } from "next/navigation";
import AuthButtonServer from "../auth-button-server";
import { createClient } from "../utils/supabase/client";
import AuthButton from "../auth-button-client";

export default async function Login() {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        redirect('/')
    }

    return (
        <div className="flex justify-center items-center m-16">
            <AuthButton session={session} />
        </div>
    )
}