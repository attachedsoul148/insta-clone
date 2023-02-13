import { onSnapshot, query, collection, orderBy } from "firebase/firestore"
import { useSession } from "next-auth/react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { db } from "../firebase"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import Head from "next/head"

const Profile = () => {
  const { data: session } = useSession()

  const [posts, setPosts] = useState<
    { id: string; postImage: string; name: string }[]
  >([])

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          postImage: doc.data().postImage,
        }))

        setPosts(newPosts.filter((post) => post.name === session?.user.name))
      }
    )
    return () => {
      unsub()
    }
  }, [])

  return (
    <div className="text-sm">
      <Head>
        <title>{session?.user.name}</title>
        <link
          rel="shortcut icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
        />
      </Head>
      <Header />
      <div className="max-w-2xl mx-auto border-b border-black py-5 flex justify-between space-x-4 px-5">
        <div className="relative">
          <img
            alt="avatar"
            src={session?.user.image!}
            className="rounded-full object-fill lg:w-32 lg:h-32"
          />
        </div>

        <div className="flex flex-col space-y-1 flex-1">
          <div className="flex items-center justify-between">
            <h1 className="font-medium text-sm md:text-lg">
              {session?.user.name}
            </h1>
            <div className="flex items-center space-x-2">
              <button className="hidden md:block text-sm font-medium bg-black/90 hover:bg-black/80 transition-colors px-10 py-2 text-white rounded-lg">
                Change your profile
              </button>
              <Cog6ToothIcon className="navBtn" />
            </div>
          </div>

          <div className="flex text-xs sm:text-sm space-x-3 sm:space-x-10">
            <p>
              <span className="font-medium">{posts.length}</span> posts
            </p>
            <p>
              <span className="font-medium">666</span> followers
            </p>
            <p>
              <span className="font-medium">1337</span> followings
            </p>
          </div>

          <div className="flex flex-col">
            <p className="font-medium">{session?.user.nickname}</p>
            <p>never meant to belongs</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 sm:px-0 gap-1 max-w-2xl mx-auto py-2 place-items-center">
        {posts.map((post) => (
          <div
            className="cursor-pointer relative border border-black scale-95 hover:scale-100 transition-all duration-200 ease-out rounded-lg"
            key={post.id}
          >
            <img
              alt="post_image"
              src={post.postImage}
              className="rounded-lg w-[380px] h-[380px] p-[2px] sm:w-[215px] sm:h-[215px]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
