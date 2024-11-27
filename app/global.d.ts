import { Database as DB } from "@/lib/database.types";

type Tweet = DB['public']['Tables']['tweets']['Row']
type Profile = DB['public']['Tables']['profiles']['Row']

declare global {
    type TweetWithAuthor = Tweet & {
        author: Profile;
        likes: number;
        userHasLikedTweet: boolean;
    }
    type Database = DB;
}