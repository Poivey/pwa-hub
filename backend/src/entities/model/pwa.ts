export interface Pwa {
  id: string
  name: string
  iconUrl: string
  url: string
  version: string
  description: string
  screenshots: string[]
  // rate: number // TODO with comments
  category: string
  popularity: string // TODO sorting on new pwa attribute "popularity, hidden from DAO, combinaison of comments and rate !"
  reviewCount: string
  // tags: string[]
  createdDate: string
  lastUpdatedDate: string
  creatorId: string
  creatorUsername: string
  devToken: string
}
