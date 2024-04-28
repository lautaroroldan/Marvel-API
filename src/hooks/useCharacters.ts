import { useEffect, useRef, useState } from "react";
import { getAllCharacters } from "../services/CharacterService"

export function useCharacter({ nameStartsWith = "", }) {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  let limit = 20
  let offset = (page - 1) * limit

  const previousSearch = useRef(nameStartsWith);
  const previousPage = useRef(page);

  function getCharacter() {
    let params: any = {}
    if (nameStartsWith) {
      params.nameStartsWith = nameStartsWith
    }
    if (limit) {
      params.limit = limit
    }
    if (offset != null) {
      params.offset = offset
    }
    if (previousSearch.current === nameStartsWith && previousPage.current == page) {
      console.log('Same search or page, not fetching')
      return
    }
    previousSearch.current = nameStartsWith

    setLoading(true)
    getAllCharacters(params).then(resp => {
      setTotalPages(Math.ceil(resp.total / limit))
      setCharacters(resp.results)
    })
      .catch(error => {
        console.error('Error fetching characters:', error);
      }).finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    getCharacter()
    previousPage.current = page
  }, [page])

  return { characters, getCharacter, loading, page, setPage, totalPages }
}
