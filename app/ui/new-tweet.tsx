import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server"

export default function NewTweet() {
    const addTweet = async (formData: FormData) => {
        'use server'
        const title = String(formData.get('title'))
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const {data: tweets, error}  = await supabase.from('tweets').insert({ title, user_id: user.id })
            if(error){
                console.error("Supabase Error:", error.message);
                // Optional: Additional debugging info
                console.error("Error Details:", error.details);
                console.error("Error Hint:", error.hint);
              }else{
                console.log('Tweet saved successfully')
                revalidatePath('/');
              }
        }
    }
    return (
        <form action={addTweet}>
            <input
                name="title"
                type="text"
                placeholder="What's happening?"
                className="mt-6 w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-shadow shadow-sm"
                maxLength={280}
            />
        </form>
    )
}
