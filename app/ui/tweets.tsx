"use client"

import { useOptimistic } from "react";
import Likes from "./likes";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
    const [optTweets, addOptTweet] = useOptimistic<TweetWithAuthor[], TweetWithAuthor>(
        tweets,
        (currentOptTweets, newTweet) => {
            const newOptTweets = [...currentOptTweets]
            const index = newOptTweets.findIndex(tweet => tweet.id === newTweet.id)
            newOptTweets[index] = newTweet;
            return newOptTweets;
        }
    )
    return (
        <div className="mt-6">
            {
                optTweets.map(tweet => (
                    <div
                        key={tweet.id}
                        className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white hover:shadow-md transition-shadow"
                    >
                        <p className="text-gray-900 font-semibold">
                            {tweet.author.name}{" "}
                            <span className="text-gray-500 text-sm">@{tweet.author.username}</span>
                        </p>
                        <p className="mt-2 text-gray-700">{tweet?.title}</p>
                        <Likes tweet={tweet} addOptimisticTweet={addOptTweet}/>
                    </div>
                ))
            }
        </div>

    )
}