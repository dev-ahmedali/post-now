import {SparklesIcon} from '@heroicons/react/outline';
import Input from './Input';
import Post from './Post';


export default function Feed() {
  const posts = [
    {
      id:"1",
      name: "Sarah Denn",
      username: "codeWithSarah",
      userImg: "./suggessionGirl2.jpg",
      img: "https://images.unsplash.com/photo-1663667163173-b1c11c74bb49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
      text: "Nice view",
      timestamp: "2 hours ago"
    },
    {
      id:"2",
      name: "Sarah Denn",
      username: "codeWithSarah",
      userImg: "./suggessionGirl2.jpg",
      img: "https://images.unsplash.com/photo-1661344663190-cf664c44b93e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      text: "Wow",
      timestamp: "2 days ago"
    }
  ]
  return (
    <div className="xl:ml-[370px] border-l border-r min xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl border-gray-200">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className='h-5'/>
        </div>
      </div>
      <Input />
      {posts.map((post) => <Post key={post.id} post={post}/>)}
    </div>
  )
}
