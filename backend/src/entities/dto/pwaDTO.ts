import { Pwa } from '../model/pwa'

export interface PwaDTO {
  id: string
  name: string
  iconUrl: string
  url: string
  version: string
  description: string
  screenshots: string[]
  category: string
  rate: number
  // tags: string[]
  createdDate: string
  lastUpdatedDate: string
  creatorId: string
  creatorUsername: string
}

export const pwaToPwaDTO = (pwa: Pwa): PwaDTO => {
  return {
    id: pwa.id,
    name: pwa.name,
    iconUrl: pwa.iconUrl,
    url: pwa.url,
    version: pwa.version,
    description: pwa.description,
    screenshots: pwa.screenshots,
    category: pwa.category,
    rate: pwa.rate,
    createdDate: pwa.createdDate,
    lastUpdatedDate: pwa.lastUpdatedDate,
    creatorId: pwa.creatorId,
    creatorUsername: pwa.creatorUsername,
  }
}
