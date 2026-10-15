import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DotPlate } from '../components/DotPlate'

const FIGURE = ['#E2572B', '#EE7A45', '#F0A04B']
const GROUND = ['#7C8F3A', '#94A04A', '#5F7A3E', '#A7AE5A']

export function Soon({ title }: { title: string }) {
  return (
    <section className="soon">
      <div className="wrap soon__grid">
        <div>
          <h1>{title}</h1>
          <p>Esta página todavía está en preparación. Mientras tanto, podés pedir tu turno desde el inicio.</p>
          <Link to="/#turno" className="btn btn--primary">
            Pedir turno <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <DotPlate
          className="plate plate--soon"
          figure={title.charAt(0)}
          figureColors={FIGURE}
          groundColors={GROUND}
          seed={title.length * 13}
          density={6000}
          develop
          label={`Lámina de puntos con la letra ${title.charAt(0)}`}
        />
      </div>
    </section>
  )
}
