import React from 'react'

interface Props {
  avatar: string
  name: string
}
const Story: React.FC<Props> = ({ avatar, name }) => {
  return (
    <div>
      <img
        src={avatar}
        alt="profile_pic"
        className="h-14 w-14 rounded-full border-2
         border-purple-500 p-[2px] object-contain cursor-pointer 
         hover:scale-110 transition-all duration-100 ease-out"
      />
      <p className="text-xs w-14 truncate text-center font-medium">{name}</p>
    </div>
  )
}

export default Story
