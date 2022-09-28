/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import Moment from 'react-moment';
import { db, storage } from '../firebase';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atom/modalAtom';

export default function Post({ post }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLikes] = useState(false);
  const [open, setOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', post.id, 'likes'),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLikes(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', post.id, 'likes', session?.user.uid));
      } else {
        await setDoc(doc(db, 'posts', post.id, 'likes', session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  }

  async function deletePost() {
    if (window.confirm('Are you sure you want to delete to this post?')) {
      deleteDoc(doc(db, 'posts', post.id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${post.id}/image`));
      }
    }
  }
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user image */}
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={post.data().userImg}
        alt="user image"
      />
      {/* right side */}
      <div className="">
        {/* header */}
        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex space-x-1 whitespace-nowrap items-center">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.data().name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post.data().username} -{' '}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/*dot icon */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-pink-100 hover:text-pink-500" />
        </div>
        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {post.data().text}
        </p>

        {/* post image */}
        <img className="rounded-2xl mr-2" src={post.data().image} />
        {/* icons */}

        <div className="flex justify-between text-gray-500 p-2">
          <ChatIcon onClick={() => {
            if(!session) {
              signIn();
            } else {
              setPostId(post.id)
                setOpen(!open)

            }
          }} className="h-9 hoverEffect w-9 p-2 hover:text-pink-500 hover:bg-pink-100" />
          {session?.user.uid === post?.data().id && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 hoverEffect w-9 p-2 hover:text-red-700 hover:bg-red-100"
            />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-9 hoverEffect w-9 p-2 text-red-500 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 hoverEffect w-9 p-2 hover:text-red-500 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && 'text-red-600'}text-sm select-none`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <ShareIcon className="h-9 hoverEffect w-9 p-2 hover:text-pink-500 hover:bg-pink-100" />
          <ChartBarIcon className="h-9 hoverEffect w-9 p-2 hover:text-pink-500 hover:bg-pink-100" />
        </div>

        <div></div>
      </div>
    </div>
  );
}
