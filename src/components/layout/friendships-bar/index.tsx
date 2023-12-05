import {FriendsArea} from "@/components/global/friends";

export const FriendshipsBar = () => {
    return (
        <div
            className='sticky right-0 top-0 hidden h-screen w-full max-w-[15em] flex-col p-3 shadow-2xl dark:border-l dark:border-l-input md:flex bg-card'>
            <FriendsArea/>
        </div>
    )
}