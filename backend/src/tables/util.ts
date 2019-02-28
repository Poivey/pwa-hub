import { DynamoDB } from 'aws-sdk'

export const getClient = (): DynamoDB.DocumentClient => new DynamoDB.DocumentClient()

const EMPTY_STRING_REPLACEMENT = 'empty_string'

export const marshal = <T extends any>(obj: T): T => {
  for (const key in obj) {
    if (obj[key.valueOf()] === '') {
      obj[key.valueOf()] = EMPTY_STRING_REPLACEMENT
    }
  }
  return obj
}

export const marshalString = (str: string): string => {
  return str === '' ? EMPTY_STRING_REPLACEMENT : str
}

export const unmarshal = <T extends any>(obj: T): T => {
  for (const key in obj) {
    if (obj[key.valueOf()] === EMPTY_STRING_REPLACEMENT) {
      obj[key.valueOf()] = ''
    }
  }
  return obj
}

export const unmarshalString = (str: string): string => {
  return str === EMPTY_STRING_REPLACEMENT ? '' : str
}

export const unmarshalList = (list: any[]): any[] => {
  return list.map(obj => unmarshal(obj))
}
