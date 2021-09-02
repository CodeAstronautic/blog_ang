export interface User {
  _id?: string
  username: string
  name: string
  email: string
  type: Number
  social_id: []
  avatar?: string
  selected_category: Array<any[]>
  bio: string
  blogs: Array<any[]>
  plan_id: string
  disable: Boolean
  firebase_token: string
}
