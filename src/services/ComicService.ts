import axios from 'axios'
import { PUBLIC_KEY,HASH_KEY } from '../keys/MarvelKeys'

export function getComicById(id:number){
return axios.get(`/v1/public/comics/${id}?ts=1685640514654&apikey=${PUBLIC_KEY}&hash=${HASH_KEY}`).then((resp)=>{
    console.log(resp.data.data.results[0])
    return resp.data.data.results[0]
})
}

export function getComicByRequest(request:string){
    return axios.get(`${request}?ts=1685640514654&apikey=${PUBLIC_KEY}&hash=${HASH_KEY}`).then((resp)=>{
        return resp.data.data.results[0]
    })
    }