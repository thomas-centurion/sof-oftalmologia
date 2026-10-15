import { type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { Cierre } from '../components/Cierre'
import { DotPlate } from '../components/DotPlate'
import { DARK_GROUND, LIGHT_GROUND, NEUTRAL_FIGURE, OLIVE_GROUND, WARM_FIGURE } from '../components/plates'
import { TurnoForm } from '../components/TurnoForm'
import { areaOrder, areas, contact, sedes, services, staff } from '../data/clinic'


/** Los primeros nombres de cada área, como muestra; el índice completo vive en Servicios. */
const samples = Object.fromEntries(
  areaOrder.map((id) => [
    id,
    services
      .filter((s) => s.area === id)
      .sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'Cirugía' ? -1 : 1))
      .slice(0, 4)
      .map((s) => s.name),
  ]),
)

export function Home() {
  const [pergamino, ...otras] = sedes

  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <h1>
              Oftalmología de alta complejidad, <span>en Pergamino.</span>
            </h1>
            <p className="hero__lead">
              Consultas, estudios y cirugías para adultos y niños, con la tecnología y los especialistas de la red SOF.
            </p>
            <ul className="hero__facts">
              <li>
                <MapPin size={18} aria-hidden="true" /> Bartolomé Mitre 882
              </li>
              <li>Más de 50 obras sociales y prepagas</li>
            </ul>
          </div>

          <figure className="hero__plate">
            <DotPlate
              className="plate plate--hero"
              figure="SOF"
              figureColors={WARM_FIGURE}
              groundColors={OLIVE_GROUND}
              seed={11}
              density={46000}
              grain={0.02}
              figureOffset={-0.08}
              figureWidth={0.8}
              lens
              develop
              reveal
              eager
              label="Lámina de puntos de colores, como las del test de Ishihara, con las letras SOF escondidas."
            />
            <figcaption>
              <strong>Lámina 1.</strong> Una lámina como las del test de Ishihara, que estudia la visión de los
              colores. <span className="lens-hint">Pasá el mouse o el dedo para enfocarla.</span>
            </figcaption>
          </figure>

          <TurnoForm id="turno" />
        </div>
      </section>

      <section className="areas" aria-labelledby="areas-title">
        <div className="wrap">
          <div className="section-head section-head--light">
            <h2 id="areas-title">Cuatro áreas, un color cada una.</h2>
            <p>El color te acompaña por el sitio: cada estudio y cada cirugía lleva el punto de su área.</p>
          </div>
          <ol className="legend">
            {areaOrder.map((id, i) => {
              const a = areas[id]
              return (
                <li key={id} className="legend__row" style={{ '--tone': a.tone } as CSSProperties}>
                  <div className="legend__plate">
                    <DotPlate
                      className="plate plate--area"
                      figure={a.name.charAt(0)}
                      figureColors={a.dots}
                      groundColors={DARK_GROUND}
                      seed={20 + i}
                      density={1800}
                      label={`Lámina de puntos con la letra ${a.name.charAt(0)}`}
                    />
                    <span className="legend__num">Lámina {i + 2}</span>
                  </div>
                  <div className="legend__name">
                    <h3>{a.name}</h3>
                    <p>{a.short}</p>
                  </div>
                  <div className="legend__body">
                    <p>{a.description}</p>
                    <p className="legend__samples">
                      {samples[id].map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </p>
                  </div>
                  <Link to={`/servicios?area=${id}`} className="legend__link">
                    Ver todo <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="equipo" aria-labelledby="equipo-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="equipo-title">Quiénes te atienden.</h2>
            <p>El equipo médico de SOF Pergamino, con formación en la UNR, la UNC y la UBA.</p>
          </div>
          <ul className="doctors">
            {staff.map((d, i) => (
              <li key={d.name} className="doctor">
                <DotPlate
                  className="plate plate--doctor"
                  figure={d.initials}
                  figureColors={d.area ? areas[d.area].dots : NEUTRAL_FIGURE}
                  groundColors={LIGHT_GROUND}
                  seed={40 + i}
                  density={2600}
                  label={`Lámina de puntos con las iniciales ${d.initials}`}
                />
                <div>
                  <h3>{d.name}</h3>
                  <p>{d.training}</p>
                  <p
                    className="doctor__focus"
                    style={d.area ? ({ '--tone': areas[d.area].tone } as CSSProperties) : undefined}
                  >
                    {d.area && <span className="row__dot" aria-hidden="true" />}
                    {d.focus}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/staff" className="text-link">
            Ver el equipo completo <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="sedes" aria-labelledby="sedes-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="sedes-title">Una red, tres ciudades.</h2>
            <p>
              SOF Pergamino nace de un acuerdo entre profesionales de la ciudad y las clínicas SOF de Córdoba y Buenos
              Aires.
            </p>
          </div>
          <div className="sedes__grid">
            <article className="sede sede--main">
              <h3>SOF {pergamino.city}</h3>
              <p className="sede__addr">
                {pergamino.address[0]}
                <br />
                {pergamino.address[1]}
              </p>
              <dl className="hours hours--dark">
                <div>
                  <dt>Lunes a viernes</dt>
                  <dd>9 a 17 h</dd>
                </div>
                <div>
                  <dt>Sábados</dt>
                  <dd>9 a 13 h</dd>
                </div>
              </dl>
              <div className="sede__actions">
                <a className="btn btn--primary" href={pergamino.maps} target="_blank" rel="noreferrer">
                  <MapPin size={20} aria-hidden="true" /> Cómo llegar
                </a>
                <a className="btn btn--ghost" href={contact.phoneHref}>
                  <Phone size={20} aria-hidden="true" /> {contact.phone}
                </a>
              </div>
            </article>
            {otras.map((s) => (
              <article key={s.id} className="sede">
                <h3>SOF {s.city}</h3>
                <p className="sede__addr">
                  {s.address[0]}
                  <br />
                  {s.address[1]}
                </p>
                <p className="sede__phone">{s.phones.join(' · ')}</p>
                {s.site && (
                  <a className="text-link" href={s.site} target="_blank" rel="noreferrer">
                    Visitar su sitio <ArrowRight size={18} aria-hidden="true" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Cierre
        title="¿Hace cuánto que no te controlás la vista?"
        figure="?"
        figureLabel="Lámina de puntos con un signo de pregunta escondido"
        plateNumber={6}
        seed={77}
        cross
      >
        Pedí turno online en un minuto, o escribinos por WhatsApp y te respondemos en el horario de atención.
      </Cierre>
    </>
  )
}
