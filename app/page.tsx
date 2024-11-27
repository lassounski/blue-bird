import { createClient } from "./utils/supabase/server";
import { redirect } from "next/navigation";

import AuthButtonServer from "./auth-button-server";
import SmoothScroll from "./ui/smooth-sroll";
import NewTweet from "./ui/new-tweet";
import Tweets from "./ui/tweets";


export default async function Home() {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data, error } = await supabase.from("tweets").select("*, author:profiles(*), likes(*)")
  const tweets = data?.map(tweet => ({
    ...tweet,
    author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    userHasLikedTweet: !!tweet.likes.find(like => like.user_id === session.user.id), //!! in front of this converts it to boolean even if the value from find is undefined
    likes: tweet.likes.length
  })) ?? [];

  if (error) {
    console.error("Supabase Error:", error);
  }

  return (
    <SmoothScroll>
      <div className="flex flex-col justify-center items-center m-16">
        <AuthButtonServer />
        <NewTweet />
        <Tweets tweets={tweets}/>
      </div>
    </SmoothScroll >
  );
}
