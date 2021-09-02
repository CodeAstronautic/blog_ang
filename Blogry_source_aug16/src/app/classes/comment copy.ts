export interface Comment {
  _id?: string
  user_id: string
  blog_id: string
  parent_id?: string
  content: string
  createdAt?: string
  user?: {
    name?: string
    avatar?: string
  }
}
