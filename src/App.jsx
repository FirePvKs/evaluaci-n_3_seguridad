import { useState } from 'react'
import Resumen from './components/Resumen'
import Marco from './components/Marco'
import Delitos from './components/Delitos'
import Comparacion from './components/Comparacion'
import Responsabilidades from './components/Responsabilidades'
import Datos from './components/Datos'
import Conclusiones from './components/Conclusiones'
import Prompts from './components/Prompts'
import './App.css'

const secciones = [
  { id: 'resumen',           label: '01 Resumen',          componente: <Resumen /> },
  { id: 'marco',             label: '02 Marco Normativo',  componente: <Marco /> },
  { id: 'delitos',           label: '03 Delitos',          componente: <Delitos /> },
  { id: 'comparacion',       label: '04 Comparacion',      componente: <Comparacion /> },
  { id: 'responsabilidades', label: '05 Responsabilidades',componente: <Responsabilidades /> },
  { id: 'datos',             label: '06 Datos Personales', componente: <Datos /> },
  { id: 'conclusiones',      label: '07 Conclusiones',     componente: <Conclusiones /> },
  { id: 'prompts',           label: '08 Bitacora IA',      componente: <Prompts /> },
]

export default function App() {
  const [activa, setActiva] = useState('resumen')
  const [menuOpen, setMenuOpen] = useState(false)

  const indice = secciones.findIndex(s => s.id === activa)
  const seccion = secciones[indice]

  const irA = (id) => {
    setActiva(id)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <header className="topnav">
        <div className="topnav-inner">
          <div className="topnav-logo">
            <img src="/logo.svg" alt="Logo" className="header-logo" />
          </div>
          <span className="topnav-brand">
            <span className="brand-badge">TI3034</span>
            CVE-2026-3854
          </span>

          {/* Desktop buttons */}
          <nav className="topnav-links">
            {secciones.map(s => (
              <button
                key={s.id}
                onClick={() => irA(s.id)}
                className={'topnav-btn' + (activa === s.id ? ' topnav-btn-active' : '')}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="hamburger" />
            <span className="hamburger" />
            <span className="hamburger" />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="mobile-menu">
            {secciones.map(s => (
              <button
                key={s.id}
                onClick={() => irA(s.id)}
                className={'mobile-nav-item' + (activa === s.id ? ' topnav-btn-active' : '')}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="main-content">
        <div className="content-area">
          {seccion.componente}

          <div className="nav-footer">
            {indice > 0 && (
              <button className="nav-arrow nav-prev" onClick={() => irA(secciones[indice - 1].id)}>
                {secciones[indice - 1].label}
              </button>
            )}
            {indice < secciones.length - 1 && (
              <button className="nav-arrow nav-next" onClick={() => irA(secciones[indice + 1].id)}>
                {secciones[indice + 1].label}
              </button>
            )}
          </div>
        </div>
      </main>
      <footer className="page-footer">
        <div className="footer-inner">
          <div className="footer-info">
            <span className="footer-name">Vicente Paolo Thomás Urbina Riquelme</span>
            <span className="footer-detail">Ingeniería Informática · Tercer Semestre</span>
            <span className="footer-detail">INACAP Valparaíso · Otoño 2026</span>
          </div>
          <a
            href="https://github.com/FirePvKs"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-github"
          >
            <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            github.com/FirePvKs
          </a>
        </div>
      </footer>
    </div>
  )
}