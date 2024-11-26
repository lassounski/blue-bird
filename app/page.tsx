import { createClient } from "./utils/supabase/server";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient()
  
  const { data: {session}} = await supabase.auth.getSession()

  if(!session){
    redirect('/login')
  }

  const { data: tweets } = await supabase.from("tweets").select()

  return (
    <div className="flex flex-col justify-center items-center m-16">
      <AuthButtonServer />
      <pre>
        {JSON.stringify(tweets, null, 2)}
      </pre>
    </div>
  );
}
