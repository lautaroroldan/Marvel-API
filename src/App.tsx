import { Suspense, lazy, } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { Spinner } from "@nextui-org/spinner";

const Character = lazy(() => import('./components/OneCharacter'))
const CharactersView = lazy(() => import('./components/SearchCharactersView'))
function App() {

  const LoadingView = () => {
    return (
      <div className='flex h-screen w-full justify-center'>
        <div className='flex justify-center items-center'>
          <img src='/src/assets/groot.png' alt='Groot' className='h-14 w-16 rounded-full' />
          <Spinner color="danger" />
        </div>

      </div>
    )
  }

  return (
    <>
      <Suspense fallback={<LoadingView />}>
        <Header />
        <Routes>
          <Route path='/loading' element={<LoadingView />} />
          <Route path='/' element={<CharactersView />} />
          <Route path='/characters' element={<CharactersView />} />
          <Route path="/characters/:id" element={<Character />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
