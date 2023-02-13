import React, { useState, useEffect } from 'react'
import { faker } from '@faker-js/faker'
import { SuggestionType } from '../types/types'
import Image from 'next/image'

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([])

  useEffect(() => {
    const sugs = [...Array(5)].map(() => ({
      id: faker.datatype.uuid(),
      avatar: faker.image.avatar(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      company: faker.company.name(),
    }))

    setSuggestions(sugs)
  }, [])
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-gray-400 text-sm font-medium">Suggestions for you</h2>

        <h2 className="text-black text-sm font-medium cursor-pointer hover:text-gray-700">
          See all
        </h2>
      </div>

      <div>
        {suggestions.map((profile) => (
          <div key={profile.id} className="flex items-center space-x-2 mt-3">
            <Image
              width={40}
              height={40}
              src={profile.avatar}
              alt="profile_pic"
              className="rounded-full cursor-pointer p-[2px] border"
            />
            <div className="flex flex-col flex-1">
              <h2 className="font-semibold cursor-pointer text-sm">{profile.firstName}</h2>
              <p className=" text-gray-400 text-sm">{profile.company}</p>
            </div>
            <p className="text-sm text-blue-400 cursor-pointer hover:text-blue-300">Subsribe</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Suggestions
