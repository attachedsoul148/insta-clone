import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import { SuggestionType } from '../types/types'
import Story from './Story'
import { useSession } from 'next-auth/react'

const Stories = () => {
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([])
  const { data: session } = useSession()

  useEffect(() => {
    const sugs = [...Array(20)].map(() => ({
      id: faker.datatype.uuid(),
      avatar: faker.image.avatar(),
      firstName: faker.name.firstName(),
    }))

    setSuggestions(sugs)
  }, [])
  return (
    <div
      className="flex overflow-x-scroll bg-white p-5 border rounded-md
     space-x-2 md:scrollbar-thin md:scrollbar-thumb-gray-200 md:scrollbar-rounded-full">
      {session && (
        <Story
          key={session?.user?.uid!}
          avatar={session?.user?.image!}
          name={session?.user?.name!}
        />
      )}
      {suggestions.map((profile) => (
        <Story key={profile.id} avatar={profile.avatar} name={profile.firstName} />
      ))}
    </div>
  )
}

export default Stories
