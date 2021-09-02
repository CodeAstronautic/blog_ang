import { User } from "./user";
import { Comment } from "./comment";

export interface Post {
  _id?: string
  user_id: string
  title: string
  content: string
  category: {
    active: true
    blog_count: number
    color_code: string
    createdAt: string
    image: string
    name: string
    slug: string
  }
  earning: number
  tag?: any[]
  files: string
  like_count: any[]
  view_count: any[]
  save_count: any[]
  createdAt: string
  updatedAt?: string
  slug: string
  share_count?: number
  comment?: Comment[]
  user?: User
  nextBlog?: {
    _id: string
    slug: string
    title: string
  }
  previousBlog?: {
    _id: string
    slug: string
    title: string
  }
}
