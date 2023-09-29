import { Suspense, lazy,} from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'

const Character = lazy(()=>import('./components/OneCharacter'))
const Main = lazy(()=>import('./components/MainSearch'))
function App() {  

  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <Header/>
      <Routes>
        <Route path='/characters' element={<Main />} />
        <Route path="/characters/:id" element={<Character/>} />
      </Routes>
      </Suspense>
    </>
  )
}

export default App
