import { createClient } from "./utils/supabase/server";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import SmoothScroll from "./ui/smooth-sroll";
import NewTweet from "./ui/new-tweet";
import Likes from "./ui/likes";


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
        <br/>
        {
          tweets?.map(tweet => (
            <div
              key={tweet.id}
              className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <p className="text-gray-900 font-semibold">
                {tweet.author.name}{" "}
                <span className="text-gray-500 text-sm">@{tweet.author.username}</span>
              </p>
              <p className="mt-2 text-gray-700">{tweet?.title}</p>
              <Likes tweet={tweet}/>
            </div>
          ))
        }
      </div>
    </SmoothScroll >
  );
}
