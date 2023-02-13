import { useSession } from 'next-auth/react'
import React from 'react'
import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

const Feed = () => {
  const { data: session } = useSession()

  return (
    <div
      className={`grid grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto px-2 lg:px-5 ${
        !session && '!grid-cols-2 !max-w-3xl'
      }`}>
      <section className="col-span-2 flex flex-col space-y-5">
        <Stories />

        <Posts />
      </section>

      {session && (
        <section className="hidden xl:flex flex-col p-5 space-y-3">
          <MiniProfile />

          <Suggestions />
        </section>
      )}
    </div>
  )
}

export default Feed
