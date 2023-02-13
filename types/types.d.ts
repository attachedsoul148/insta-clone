import { Timestamp } from "firebase/firestore"

export interface SuggestionType {
  id: string
  avatar: string
  firstName: string
  lastName?: string
  company?: string
}
export interface PostType {
  id: string
  email: string
  name: string
  postImage: string
  likesCount: number
  text: string
  timestamp: Timestamp
  userImage: string
  comments?: CommentType[]
}

export interface CommentType {
  id: string
  name: string
  timestamp: Timestamp
  text: string
}
