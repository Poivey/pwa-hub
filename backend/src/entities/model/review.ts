export interface Review {
  pwaId: string
  userId: string
  creationDate: string
  pwaName: string
  username: string
  content: string
  rate: number
}

export const MAX_RATE = 5
export const MIN_RATE = 1
