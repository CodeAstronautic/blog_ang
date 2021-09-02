import { UserClass } from "./userClass";

export interface Comment {
  _id?: string
  user_id: any
  avatar: any
  name: any
  blog_id: string
  parent_id?: string
  content: string
  createdAt?: string
  user?: UserClass
}
