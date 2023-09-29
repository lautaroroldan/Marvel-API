import axios from 'axios'
import { PUBLIC_KEY, HASH_KEY } from '../keys/MarvelKeys'

axios.defaults.baseURL = 'https://gateway.marvel.com:443'

interface CharacterParams {
  nameStartsWith?: string
  modifiedSince?: Date
  comics?: number[]
  series?: number[]
  events?: number[]
  stories?: number[]
  orderBy?: string
  limit?: number
  offset: number
}

export function getAllCharacters(params: CharacterParams) {
  return axios.get(`/v1/public/characters?ts=1685640514654&apikey=${PUBLIC_KEY}&hash=${HASH_KEY}`, {
    params: {
      nameStartsWith: params.nameStartsWith ?? null,
      modifiedSince: params.modifiedSince ?? null,
      comics: params.comics ?? null,
      series: params.series ?? null,
      events: params.events ?? null,
      stories: params.stories ?? null,
      orderBy: params.orderBy ?? null,
      limit: params.limit ?? null,
      offset: params.offset ?? null
    }
  })
    .then((response) => {
      return response.data.data
    })
}

export function findCharacterById(id: number) {
  console.log(`API: FindCharacterById , ${id}`)
  return axios.get(`/v1/public/characters/${id}?ts=1685640514654&apikey=${PUBLIC_KEY}&hash=${HASH_KEY}`)
    .then((response) => {
      console.log(response.data.data.results[0])
      return response.data.data.results[0]
    })
}

export function findComicsByItem(item: any) {
  return axios.get(`${item.resourceURI}?ts=1685640514654&apikey=${PUBLIC_KEY}&hash=${HASH_KEY}`)
    .then((response) => {
      console.log(response.data.data.results[0])
      return response.data.data.results[0]
    })
}


