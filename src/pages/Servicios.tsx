import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DotPlate } from '../components/DotPlate'
import { LIGHT_GROUND } from '../components/plates'
import { areaOrder, areas, services, type AreaId } from '../data/clinic'

const ALL_TONES = areaOrder.flatMap((id) => areas[id].dots.slice(0, 2))

type Filter = AreaId | 'todas'

function initialFilter(): Filter {
  const area = new URLSearchParams(window.location.search).get('area')
  return area && area in areas ? (area as AreaId) : 'todas'
}

export function Servicios() {
  const [filter, setFilter] = useState<Filter>(initialFilter)
  const visible = services.filter((s) => filter === 'todas' || s.area === filter)
  const columns = [
    { title: 'Estudios', items: visible.filter((s) => s.kind === 'Estudio') },
    { title: 'Cirugías', items: visible.filter((s) => s.kind === 'Cirugía') },
  ]

  return (
    <section className="practicas practicas--page" aria-labelledby="practicas-title">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div className="section-head__text">
            <h1 id="practicas-title">Estudios y cirugías.</h1>
            <p>Todo lo que hacemos en SOF Pergamino, ordenado por área. Tocá un color para filtrar.</p>
          </div>
          <figure className="area-plate" aria-live="polite">
            <DotPlate
              key={filter}
              className="plate"
              figure={filter === 'todas' ? String(areaOrder.length) : areas[filter].name.charAt(0)}
              figureColors={filter === 'todas' ? ALL_TONES : areas[filter].dots}
              groundColors={LIGHT_GROUND}
              seed={filter === 'todas' ? 30 : 20 + areaOrder.indexOf(filter)}
              density={6000}
              grain={0.03}
              develop
              label={
                filter === 'todas'
                  ? 'Lámina de puntos con el número 4, en los colores de las cuatro áreas'
                  : `Lámina de puntos con la letra ${areas[filter].name.charAt(0)}`
              }
            />
            <figcaption>{filter === 'todas' ? 'Las cuatro áreas' : areas[filter].name}</figcaption>
          </figure>
          <div className="filters" role="group" aria-label="Filtrar por área">
            <button
              type="button"
              className="filter"
              aria-pressed={filter === 'todas'}
              onClick={() => setFilter('todas')}
            >
              Todas
            </button>
            {areaOrder.map((id) => (
              <button
                key={id}
                type="button"
                className="filter"
                aria-pressed={filter === id}
                style={{ '--tone': areas[id].tone } as CSSProperties}
                onClick={() => setFilter(id)}
              >
                <span className="filter__dot" aria-hidden="true" />
                {areas[id].name}
              </button>
            ))}
          </div>
        </div>

        <div className="index">
          {columns.map((col) => (
            <div key={col.title} className="index__col">
              <h2 className="index__h">
                {col.title} <span>{col.items.length}</span>
              </h2>
              {col.items.length ? (
                <ul>
                  {col.items.map((s) => (
                    <li key={s.name} className="row" style={{ '--tone': areas[s.area].tone } as CSSProperties}>
                      <span className="row__dot" aria-hidden="true" />
                      <span className="row__name">
                        {s.name}
                        {s.detail && <span className="row__detail">{s.detail}</span>}
                      </span>
                      <span className="row__area">{areas[s.area].name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="index__empty">No hay {col.title.toLowerCase()} en esta área.</p>
              )}
            </div>
          ))}
        </div>
        <Link to="/#turno" className="btn btn--primary">
          Pedir turno <ArrowRight size={20} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
