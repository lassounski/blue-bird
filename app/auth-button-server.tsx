import AuthButton from "./auth-button-client";
import { createClient } from "./utils/supabase/server";

// Getting the session from supabase and injecting it into AuthButton because client components do not have access to the server side
export default async function AuthButtonServer(){
    const supabase = await createClient()
    const {
        data: {session},
    } = await supabase.auth.getSession()

    return <AuthButton session={session}/>
}