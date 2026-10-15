import { type CSSProperties } from 'react'
import { Cierre } from '../components/Cierre'
import { DotPlate } from '../components/DotPlate'
import { LIGHT_GROUND, NEUTRAL_FIGURE } from '../components/plates'
import { areas, staff } from '../data/clinic'

const schools = [
  { name: 'Universidad Nacional de Rosario', short: 'UNR' },
  { name: 'Universidad Nacional de Córdoba', short: 'UNC' },
  { name: 'Universidad de Buenos Aires', short: 'UBA' },
]

const memberships = [
  'Academia Americana de Oftalmología',
  'Academia Europea de Oftalmología',
  'CONICET',
]

export function Staff() {
  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__grid">
          <div className="page-head__copy">
            <h1>
              Quiénes <span>te atienden.</span>
            </h1>
            <p className="page-head__lead">
              Los oftalmólogos de SOF Pergamino, con formación de grado y especialización en universidades y hospitales
              del país. Parte de la red SOF, junto a las clínicas de Córdoba y Buenos Aires.
            </p>
          </div>
          <figure className="page-head__plate">
            <DotPlate
              className="plate"
              figure={String(staff.length)}
              figureColors={NEUTRAL_FIGURE}
              groundColors={LIGHT_GROUND}
              seed={91}
              density={24000}
              grain={0.026}
              figureOffset={-0.12}
              figureWidth={0.6}
              develop
              reveal
              lens
              label={`Lámina de puntos con el número ${staff.length} escondido`}
            />
            <figcaption>
              <strong>Lámina 1.</strong> {staff.length} especialistas en el equipo de Pergamino.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="roster" aria-labelledby="roster-title">
        <div className="wrap">
          <h2 id="roster-title" className="sr-only">
            Equipo médico
          </h2>
          <ol className="roster__list">
            {staff.map((d, i) => (
              <li
                key={d.name}
                className="roster__row"
                style={d.area ? ({ '--tone': areas[d.area].tone } as CSSProperties) : undefined}
              >
                <div className="roster__plate">
                  <DotPlate
                    className="plate"
                    figure={d.initials}
                    figureColors={d.area ? areas[d.area].dots : NEUTRAL_FIGURE}
                    groundColors={LIGHT_GROUND}
                    seed={40 + i}
                    density={3600}
                    label={`Lámina de puntos con las iniciales ${d.initials}`}
                  />
                  <span className="plate-num">Lámina {i + 2}</span>
                </div>
                <h3 className="roster__name">{d.name}</h3>
                <dl className="roster__facts">
                  <div>
                    <dt>Formación</dt>
                    <dd>{d.training}</dd>
                  </div>
                  <div>
                    <dt>Especialidad</dt>
                    <dd className={d.area ? 'has-tone' : undefined}>{d.focus}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="credenciales" aria-labelledby="credenciales-title">
        <div className="wrap credenciales__grid">
          <div className="section-head">
            <h2 id="credenciales-title">Formación que se renueva.</h2>
            <p>
              El equipo se mantiene en actualización e investigación constante. Parte del staff integra estas
              instituciones:
            </p>
          </div>
          <div className="credenciales__lists">
            <div>
              <h3 className="list-h">Instituciones</h3>
              <ul className="ruled">
                {memberships.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="list-h">Universidades de formación</h3>
              <ul className="ruled">
                {schools.map((s) => (
                  <li key={s.short}>
                    {s.name} <span className="ruled__aside">{s.short}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Cierre
        title="Atendete con nuestro equipo."
        figure="?"
        figureLabel="Lámina de puntos con un signo de pregunta escondido"
        plateNumber={staff.length + 2}
        seed={78}
      >
        Pedí turno online en un minuto, o escribinos por WhatsApp y te respondemos en el horario de atención.
      </Cierre>
    </>
  )
}
