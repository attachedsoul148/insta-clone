import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import { PostType } from "../types/types"
import Post from "./Post"

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          postImage: doc.data().postImage,
          timestamp: doc.data().timestamp,
          likesCount: doc.data().likesCount,
          text: doc.data().text,
          userImage: doc.data().userImage,
        }))

        setPosts(newPosts)
      }
    )
    return () => {
      unsub()
    }
  }, [])
  return (
    <div className="flex flex-col space-y-5">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          profilePic={post.userImage}
          username={post.name}
          likesCount={post.likesCount}
          postImage={post.postImage}
          caption={post.text}
        />
      ))}
    </div>
  )
}

export default Posts
