import { Pwa } from '../model/pwa'

export interface NewPwa {
  name: string
  url: string
  version: string
  description: string
  category: string
  popularity: string // FIXME remove when computed !
  reviewCount: string // FIXME remove when computed !
}

export const isValid = (newPwa: NewPwa): boolean => {
  return !!(
    newPwa &&
    newPwa.name &&
    newPwa.url &&
    newPwa.version &&
    newPwa.description &&
    newPwa.category &&
    newPwa.popularity &&
    newPwa.reviewCount
  )
}

export const toPwa = (newPwa: NewPwa): Pwa => {
  return {
    id: '',
    name: newPwa.name,
    iconUrl: '',
    url: newPwa.url,
    version: newPwa.version,
    description: newPwa.description,
    screenshots: [],
    category: newPwa.category,
    popularity: newPwa.popularity, // FIXME
    reviewCount: newPwa.reviewCount, // FIXME
    createdDate: '',
    lastUpdatedDate: '',
    creatorId: '',
    creatorUsername: '',
    devToken: '',
  }
}
