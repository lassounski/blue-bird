'use client'

import { createClient } from "../utils/supabase/client";
import { AiOutlineLike } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function Likes({ tweet } : {tweet : TweetWithAuthor}) {
    const router = useRouter();

    const handleLikes = async () => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            if (tweet.userHasLikedTweet) {
                const { error } = await supabase.from('likes').delete()
                .eq('tweet_id', tweet.id)
                .eq('user_id', user.id)
                if (error) {
                    console.error("Supabase Error:", error);
                } else {
                    console.log('Tweet unliked.')
                    router.refresh()
                }
            } else {
                const { data: _, error } = await supabase.from('likes').insert({ user_id: user.id, tweet_id: tweet.id })
                if (error) {
                    console.error("Supabase Error:", error);
                } else {
                    console.log('Tweet liked.')
                    router.refresh()
                }
            }
        }
    }
    return (
        <div className="flex items-center space-x-2 mt-4">
            <button
                onClick={handleLikes}
                className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                aria-label="Like"
            >
                <AiOutlineLike className="w-6 h-6" />
            </button>
            <span className="text-gray-600 text-sm">{tweet.likes} Likes</span>
        </div>
    )
}