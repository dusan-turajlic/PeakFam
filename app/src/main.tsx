import '@/index.css'
// Triggers a web worker to fetch index data so we an easily search for products
// import '@/services/api/openFoodDex/worker'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
