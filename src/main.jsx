import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AppContextProvider} from "./contextApi/ContextApi.jsx"


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AppContextProvider>
        <App></App>
     </AppContextProvider>
  </StrictMode>,
)
