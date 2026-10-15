import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { contact } from '../data/clinic'
import { DotPlate } from './DotPlate'
import { OLIVE_GROUND, WARM_FIGURE } from './plates'

interface CierreProps {
  title: string
  children: ReactNode
  figure: string
  figureLabel: string
  plateNumber: number
  seed: number
  /** La lámina sube por encima del corte con la sección anterior. */
  cross?: boolean
}

/** Banda final en pino: llamado a pedir turno y una lámina que sube sobre el corte. */
export function Cierre({ title, children, figure, figureLabel, plateNumber, seed, cross = false }: CierreProps) {
  return (
    <section className={`cierre${cross ? ' cierre--cross' : ''}`} aria-labelledby="cierre-title">
      <div className="wrap cierre__grid">
        <div>
          <h2 id="cierre-title">{title}</h2>
          <p>{children}</p>
          <div className="cierre__actions">
            <Link to="/#turno" className="btn btn--primary btn--lg">
              Pedir turno <ArrowRight size={22} aria-hidden="true" />
            </Link>
            <a href={contact.whatsapp} className="btn btn--ghost-light btn--lg" target="_blank" rel="noreferrer">
              <MessageCircle size={22} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
      <figure className="cierre__plate">
        <DotPlate
          className="plate plate--cierre"
          figure={figure}
          figureColors={WARM_FIGURE}
          groundColors={OLIVE_GROUND}
          seed={seed}
          density={9000}
          reveal
          label={figureLabel}
        />
        <figcaption>Lámina {plateNumber}</figcaption>
      </figure>
    </section>
  )
}
