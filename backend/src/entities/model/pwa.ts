export interface Pwa {
  id: string
  name: string
  iconUrl: string
  url: string
  version: string
  description: string
  screenshots: string[]
  category: string
  rate: number
  reviewCount: number
  popularity: number // TODO remove this comment is popularity works as a number instead of as a string
  // tags: string[]
  createdDate: string
  lastUpdatedDate: string
  creatorId: string
  creatorUsername: string
  devToken: string
}
