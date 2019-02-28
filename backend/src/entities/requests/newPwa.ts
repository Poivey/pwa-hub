import { Pwa } from '../model/pwa'

export interface NewPwa {
  name: string
  url: string
  version: string
  description: string
  category: string
}

export const isValid = (newPwa: NewPwa): boolean => {
  return !!(
    newPwa &&
    newPwa.name &&
    newPwa.url &&
    newPwa.version &&
    newPwa.description &&
    newPwa.category
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
    popularity: 0,
    reviewCount: 0,
    rate: 0,
    createdDate: '',
    lastUpdatedDate: '',
    creatorId: '',
    creatorUsername: '',
    devToken: '',
  }
}
