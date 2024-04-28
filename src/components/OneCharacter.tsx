import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { findCharacterById } from '../services/CharacterService'
import useComics from '../hooks/useComics'
import { Comic } from '../types/Character'
export default function OneCharacter() {
    const params = useParams()
    const { id } = params
    const { data, } = useSWR('/findCharacterByCharacterId/' + id, () => findCharacterById(Number(id)))
    const { comics } = useComics({ listComics: data?.comics.items })


    useEffect(() => {
        document.title = `Marvel API - ${data?.name}`
    }, [data])

    function renderCharacter() {
        if (data) {
            return (
                <div className='m-12'>
                    <div className='flex justify-center items-start gap-6'>
                        <div>
                            {data.thumbnail && <img src={data.thumbnail.path + '.' + data.thumbnail.extension} alt={data.name} className='w-[500px] object-cover' />}
                        </div>
                        <div className='w-[60ch] flex flex-col gap-4'>
                            <h4 className='font-bold text-red-500/50 text-5xl'>{data.name}</h4>
                            <p className='text-gray-600'>{data.description ? data.description : 'There is no description given by marvel'}</p>
                            <h4 className='font-bold text-2xl text-red-500/50'>Appearances</h4>
                            {
                                comics && <div className='grid grid-cols-2 gap-4 h-64 overflow-auto'>
                                    {comics.map((comic: Comic) => {
                                        return (
                                            <div key={comic.id} className='flex gap-2'>
                                                {comic.thumbnail && (<img className='w-12 object-cover' src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} />)}
                                                <p className='text-gray-600'>{comic.title}</p>
                                            </div>
                                        )
                                    })}</div>
                            }
                        </div>

                    </div>
                </div>
            )
        }
    }

    return (
        <div className='p-4'>
            {renderCharacter()}
        </div>
    )
}

