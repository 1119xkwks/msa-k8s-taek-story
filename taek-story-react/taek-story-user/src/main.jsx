import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css' // Tailwind CSS를 위해 App.css import
import './assets/fonts/notosanskr/fonts.css' // NotoSansKR 폰트 import
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
