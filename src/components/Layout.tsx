import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, Phone, X } from 'lucide-react'
import { contact, hours } from '../data/clinic'
import { openStatus } from '../lib/schedule'

const nav = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/staff', label: 'Staff' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

/** Marca: una mini lámina de puntos al lado del nombre. */
export function BrandMark({ size = 34 }: { size?: number }) {
  const dots: [number, number, number, string][] = [
    [20, 20, 7.2, '#E2572B'],
    [8.6, 14, 4.4, '#7C8F3A'],
    [10.5, 27.5, 4.8, '#4E7A4C'],
    [22, 7.6, 4.2, '#7C8F3A'],
    [31.5, 15, 4, '#2F5D4E'],
    [30.5, 28, 5, '#EE7A45'],
    [20, 33, 3.6, '#4E7A4C'],
    [4, 22, 2.4, '#2F5D4E'],
    [13, 4.5, 2.4, '#4E7A4C'],
    [35, 22, 2.2, '#7C8F3A'],
  ]
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="brand__mark">
      {dots.map(([cx, cy, r, fill], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />
      ))}
    </svg>
  )
}

function useOpenStatus() {
  const [status, setStatus] = useState(() => openStatus())
  useEffect(() => {
    const t = window.setInterval(() => setStatus(openStatus()), 60_000)
    return () => window.clearInterval(t)
  }, [])
  return status
}

export function Layout() {
  const status = useOpenStatus()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash, location.key])

  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="wrap site-header__row">
          <Link to="/" className="brand" aria-label="SOF Pergamino, inicio">
            <BrandMark />
            <span className="brand__word">
              SOF <span>Pergamino</span>
            </span>
          </Link>

          <nav className={`site-nav${open ? ' is-open' : ''}`} id="site-nav" aria-label="Principal">
            <ul>
              {nav.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} end={n.to === '/'}>
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <a className="site-nav__phone" href={contact.phoneHref}>
              <Phone size={18} aria-hidden="true" /> {contact.phone}
            </a>
          </nav>

          <div className="site-header__aside">
            <p className={`status${status.open ? ' is-open' : ''}`}>
              <span className="status__dot" aria-hidden="true" />
              {status.text}
            </p>
            <Link to="/#turno" className="btn btn--primary btn--sm site-header__cta">
              Pedir turno
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="site-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
              <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="contenido">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="wrap site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="brand brand--light" aria-label="SOF Pergamino, inicio">
              <BrandMark size={40} />
              <span className="brand__word">
                SOF <span>Pergamino</span>
              </span>
            </Link>
            <p>La salud de tus ojos es nuestro compromiso.</p>
          </div>
          <div>
            <h2 className="site-footer__h">Dónde estamos</h2>
            <p>
              Bartolomé Mitre 882
              <br />
              Pergamino, Buenos Aires
            </p>
          </div>
          <div>
            <h2 className="site-footer__h">Horarios</h2>
            <dl className="hours">
              <div>
                <dt>Lunes a viernes</dt>
                <dd>
                  {hours[1]![0]} a {hours[1]![1]} h
                </dd>
              </div>
              <div>
                <dt>Sábados</dt>
                <dd>
                  {hours[6]![0]} a {hours[6]![1]} h
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="site-footer__h">Contacto</h2>
            <ul className="site-footer__list">
              <li>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              <li>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp {contact.whatsappLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noreferrer">
                  {contact.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="wrap site-footer__base">
          <p>Rediseño de práctica, no es el sitio oficial de SOF. El formulario de turnos no envía datos.</p>
          <p>Contenido tomado de sofpergamino.com.ar</p>
        </div>
      </footer>
    </>
  )
}
