import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import '@fontsource-variable/atkinson-hyperlegible-next'
import './styles.css'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Servicios } from './pages/Servicios'
import { Contacto } from './pages/Contacto'
import { Nosotros } from './pages/Nosotros'
import { Soon } from './pages/Soon'
import { Staff } from './pages/Staff'

// Un solo paquete: el sitio es chico y dividirlo agregaba una descarga extra en cada visita directa.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="staff" element={<Staff />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="*" element={<Soon title="Página no encontrada" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
