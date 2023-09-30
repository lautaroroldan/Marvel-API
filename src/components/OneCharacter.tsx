import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { findCharacterById } from '../services/CharacterService'
import useComics from '../hooks/useComics'
export default function OneCharacter() {
    const params = useParams()
    const { id } = params
    const { data, } = useSWR('/findCharacterByCharacterId/' + id, () => findCharacterById(Number(id)))
    const { comics } = useComics({ listComics: data?.comics.items })


    useEffect(() => {
        document.title = `Marvel API - ${data?.name}`
    }, [])

    function renderCharacter() {
        if (data) {
            return (
                <div>
                    <div className='flex justify-center items-start m-12'>
                        <div className=''>
                            <h4 className='font-bold text-red-500/50'>{data.name}</h4>
                            {data.thumbnail && <img src={data.thumbnail.path + '.' + data.thumbnail.extension} alt={data.name} style={{ width: '200px' }} />}
                        </div>
                        <div className='w-1/2 p-4'>
                            {data.description && <p className='text-gray-600'>{data.description}</p>}
                        </div>

                    </div>
                    {
                        comics && <p>{comics.map((comic: any, index: any) => {
                            return (
                                <div key={index}>
                                    <p className='text-gray-600'>{comic.title}</p>
                                </div>
                            )
                        })}</p>
                    }

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

