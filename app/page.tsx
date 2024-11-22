

import { cookies } from "next/headers";
import AuthButton from "./auth-button";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "./utils/supabase/server";

export default async function Home() {
  const supabase = await createClient()
  const { data: tweets } = await supabase.from("tweets").select();

  return (
    <div>
      <AuthButton />
      <pre>
        {JSON.stringify(tweets, null, 2)}
      </pre>
    </div>
  );
}
