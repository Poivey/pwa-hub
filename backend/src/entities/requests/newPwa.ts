import { Pwa } from '../model/pwa'

export interface NewPwa {
  name: string
  url: string
  description: string
  category: string
}

export const isValid = (newPwa: NewPwa): boolean => {
  return !!(newPwa && newPwa.name && newPwa.url && newPwa.description && newPwa.category)
}

export const toPwa = (newPwa: NewPwa): Pwa => {
  return {
    id: '',
    name: newPwa.name.trim(),
    nameLowerCase: newPwa.name.trim().toLowerCase(),
    iconUrl: '',
    url: newPwa.url,
    description: newPwa.description,
    screenshots: [],
    category: newPwa.category.trim().toLowerCase(),
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
