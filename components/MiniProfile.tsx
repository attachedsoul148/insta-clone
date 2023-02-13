import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const MiniProfile = () => {
  const { data: session } = useSession()

  return (
    <div className="flex items-center space-x-4">
      <Image
        width={60}
        height={60}
        src={session?.user?.image!}
        alt="profile_pic"
        className="rounded-full cursor-pointer"
      />
      <div className="flex flex-col flex-1">
        <h2 className="font-semibold cursor-pointer text-sm">{session?.user?.name}</h2>
        <p className=" text-gray-400 text-sm">{session?.user?.nickname}</p>
      </div>
      <p
        className="text-sm text-blue-400 cursor-pointer hover:text-blue-300"
        onClick={() => signOut()}>
        Sign out
      </p>
    </div>
  )
}

export default MiniProfile
