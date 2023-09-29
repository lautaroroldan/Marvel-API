import { useEffect, useState } from 'react'
import { useCharacter } from '../hooks/useCharacters'
import Characters from './Characters'
import { Input } from "@nextui-org/input";
import { SearchIcon } from './SearchIcon';
import { Button } from "@nextui-org/button";

function MainSearch() {
  const [inputText, setInputText] = useState<string>('')
  const { getCharacter, loading, characters, page, setPage, totalPages } = useCharacter({ nameStartsWith: inputText })

  const handleInputChange = (event: any) => {
    setInputText(event.target.value)
  }

  useEffect(() => {
    document.title = `Marvel Api`
  }, [])

  function handleSubmit(event: any) {
    setPage(1)
    event.preventDefault()
    getCharacter()
  }

  return (
    <main className='mt-12 max-w-7xl ml-auto mr-auto'>
      <div className='mb-12 px-4'>
        <form onSubmit={handleSubmit} className='flex justify-center items-center gap-4'>
          <Input
            type='text'
            label="Search"
            isClearable
            value={inputText}
            onChange={handleInputChange}
            radius="lg"
            onClear={() => {
              setInputText('')
            }}
            className='w-full'
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xs",
                "rounded-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search a character, comic, event..."
            startContent={
              <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Button type='submit' variant='ghost' color='danger'>Buscar</Button>
        </form>
      </div>
      <Characters characters={characters} page={page} setPage={setPage} totalPages={totalPages} loading={loading} />
    </main>
  )
}

export default MainSearch