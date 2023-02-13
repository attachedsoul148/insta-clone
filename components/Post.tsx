import Image from "next/image"
import React, { useEffect, useState } from "react"
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline"
import { HeartIcon as FilledHeart } from "@heroicons/react/24/solid"
import { useSession } from "next-auth/react"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore"
import { db } from "../firebase"
import { CommentType } from "../types/types"
import Moment from "react-moment"

interface Props {
  profilePic: string
  username: string
  likesCount: number
  postImage: string
  caption: string
  id: string
}
const Post: React.FC<Props> = ({
  profilePic,
  username,
  likesCount,
  postImage,
  caption,
  id,
}) => {
  const { data: session } = useSession()
  const [value, setValue] = useState("")
  const [comments, setComments] = useState<CommentType[]>([])
  const [likes, setLikes] = useState<string[]>([])
  const [isLiked, setIsLiked] = useState(false)

  const addComment = async () => {
    if (value) {
      const docRef = doc(db, "posts", id)

      await addDoc(collection(docRef, "comments"), {
        name: session?.user.name,
        timestamp: Timestamp.now(),
        text: value,
      })
    }

    setValue('')
  }

  const likePost = async () => {
    if (!isLiked) {
      await setDoc(doc(db, "posts", id, "likes", session?.user.uid!), {
        name: session?.user.uid,
      })
    } else {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid!))
    }
  }

  useEffect(() => {
    const docRef = doc(db, "posts", id)
    const unsub = onSnapshot(
      query(collection(docRef, "comments"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const newComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          timestamp: doc.data().timestamp,
          text: doc.data().text,
        }))

        setComments(newComments)
      }
    )
    return () => {
      unsub()
    }
  }, [])

  useEffect(() => {
    const docRef = doc(db, "posts", id)
    const unsub = onSnapshot(query(collection(docRef, "likes")), (snapshot) => {
      const likesIds = snapshot.docs.map((doc) => doc.id)

      setLikes(likesIds)
    })
    return () => {
      unsub()
    }
  }, [])

  useEffect(() => {
    if (!likes.find((el) => el === session?.user.uid)) {
      setIsLiked(false)
    } else {
      setIsLiked(true)
    }
  }, [likes])
  return (
    <div className="flex flex-col border rounded-md bg-white">
      <div className="flex items-center space-x-2 p-3">
        <Image
          width={30}
          height={30}
          src={profilePic}
          alt="profile_pic"
          className="rounded-full"
        />
        <p className="text-sm font-medium flex-1">{username}</p>
        <EllipsisHorizontalIcon className="navBtn h-7 w-7" />
      </div>

      {postImage && (
        <img src={postImage} alt="post_image" className="w-full object-cover" />
      )}

      <div className="flex items-center justify-between px-3 pt-3">
        {session && (
          <>
            <div className="flex space-x-2">
              {isLiked ? (
                <FilledHeart
                  className="navBtn text-red-500"
                  onClick={likePost}
                />
              ) : (
                <HeartIcon className="navBtn" onClick={likePost} />
              )}
              <ChatBubbleBottomCenterTextIcon className="navBtn" />
              <PaperAirplaneIcon className="navBtn -rotate-90" />
            </div>
            <BookmarkIcon className="navBtn" />
          </>
        )}
      </div>

      <p className="font-medium text-sm px-3 py-1">{likes.length} Likes</p>

      <div className="flex items-center space-x-2 px-3">
        <span className="font-medium text-sm">{username}</span>
        <p className="truncate text-sm">{caption}</p>
      </div>

      <div className="flex flex-col px-3 pt-1">
        <p className="text-sm text-gray-500">Comments</p>
        <div
          className="max-h-[85px]
       overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200"
        >
          {comments?.map((comment) => (
            <div className="flex justify-between items-center space-x-2 ">
              <p className="text-sm px-1 truncate">
                <span className="font-medium">{comment.name}</span>{" "}
                {comment.text}
              </p>

              <Moment fromNow className="text-xs pr-3">
                {comment.timestamp.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center p-3 space-x-2">
        <FaceSmileIcon className="h-6 w-6 cursor-pointer" />
        <input
          disabled={!session}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="outline-none border-none flex-1 text-sm"
          placeholder="Add a comment..."
        />
        <button
          onClick={addComment}
          disabled={!session}
          className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
        >
          Post
        </button>
      </div>
    </div>
  )
}

export default Post
