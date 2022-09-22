import React from 'react'
import SidebarMenuItem from './SidebarMenuItem'
import {  HomeIcon } from "@heroicons/react/solid"
import {BellIcon, BookmarkIcon, ClipboardIcon, HashtagIcon, InboxIcon, UserIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon, } from "@heroicons/react/outline"

export default function Sidebar() {
  return (
    <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full'>
        {/* logo */}
        <div className='hoverEffect p-0 hover:bg-red-100 xl:px-1'>
            <h3>Post Now</h3>
        </div>
        {/* menu */}
        <div className='mt-4 mb-2.5 xl:items-start'>
            <SidebarMenuItem text= "Home" Icon={HomeIcon} active/>
            <SidebarMenuItem text= "Explore" Icon={HashtagIcon}/>
            <SidebarMenuItem text= "Notification" Icon={BellIcon}/>
            <SidebarMenuItem text= "Messages" Icon={InboxIcon}/>
            <SidebarMenuItem text= "Bookmarks" Icon={BookmarkIcon}/>
            <SidebarMenuItem text= "Lists" Icon={ClipboardIcon}/>
            <SidebarMenuItem text= "Profile" Icon={UserIcon}/>
            <SidebarMenuItem text= "More" Icon={DotsCircleHorizontalIcon}/>
        </div>

        {/* button */}

        <button className='bg-red-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Post</button>

        {/* mini-profile */}

        <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
            <img src='./SuggessionGirl2.jpg' alt='user-img' className='h-10 w-10 rounded-full xl:mr-2'/>
            <div className='leading-5 hidden xl:inline'>
                <h4 className='font-bold'>Sarah</h4>
                <p className='text-gray-500'>@sarah</p>
            </div>
            <DotsHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline'/>
        </div>
    </div>
  )
}
