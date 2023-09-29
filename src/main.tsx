import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {NextUIProvider} from "@nextui-org/react";

createRoot(document.getElementById('root') as HTMLElement).render(
  <NextUIProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NextUIProvider>
)
