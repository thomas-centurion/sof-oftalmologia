import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { Cierre } from '../components/Cierre'
import { ContactForm } from '../components/ContactForm'
import { DotPlate } from '../components/DotPlate'
import { OLIVE_GROUND, WARM_FIGURE } from '../components/plates'
import { contact, hours, sedes } from '../data/clinic'

const channels = [
  { label: 'Teléfono', value: contact.phone, href: contact.phoneHref },
  { label: 'WhatsApp', value: contact.whatsappLabel, href: contact.whatsapp, external: true },
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'Turnos por email', value: contact.turnosEmail, href: `mailto:${contact.turnosEmail}` },
  { label: 'Instagram', value: contact.instagramHandle, href: contact.instagram, external: true },
]

export function Contacto() {
  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__grid">
          <div className="page-head__copy">
            <h1>
              Hablemos. <span>Estamos en tres ciudades.</span>
            </h1>
            <p className="page-head__lead">
              Escribinos, llamanos o vení a vernos a Bartolomé Mitre 882. Si querés un turno, pedilo online en un
              minuto.
            </p>
            <div className="page-head__actions">
              <Link to="/#turno" className="btn btn--primary">
                Pedir turno <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <a href="#sedes" className="btn btn--ghost">
                <MapPin size={20} aria-hidden="true" /> Ver las sedes
              </a>
            </div>
          </div>
          <ol className="trio" aria-label="Sedes">
            {sedes.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="trio__link">
                  <DotPlate
                    className="plate"
                    figure={s.city.charAt(0)}
                    figureColors={WARM_FIGURE}
                    groundColors={OLIVE_GROUND}
                    seed={57 + i}
                    density={7000}
                    grain={0.03}
                    develop
                    label={`Lámina de puntos con la letra ${s.city.charAt(0)}`}
                  />
                  <span className="trio__city">{s.city}</span>
                  <span className="plate-num">Lámina {i + 1}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="escribinos" aria-labelledby="escribinos-title">
        <div className="wrap escribinos__grid">
          <div>
            <div className="section-head">
              <h2 id="escribinos-title">Escribinos.</h2>
              <p>Te respondemos en el horario de atención de la sede Pergamino.</p>
            </div>
            <ContactForm />
          </div>
          <aside className="canales" aria-labelledby="canales-title">
            <h2 id="canales-title" className="list-h">
              Otros canales
            </h2>
            <ul className="ruled">
              {channels.map((c) => (
                <li key={c.label}>
                  <span className="ruled__aside">{c.label}</span>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="list-h canales__h">Horarios en Pergamino</h2>
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
          </aside>
        </div>
      </section>

      <section className="sedes-map" id="sedes" aria-labelledby="sedes-map-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="sedes-map-title">Las tres sedes.</h2>
          </div>
          <ol className="sedes-map__list">
            {sedes.map((s, i) => (
              <li key={s.id} id={s.id} className={`sede-map${i === 0 ? ' sede-map--main' : ''}`}>
                <div className="sede-map__info">
                  <h3>SOF {s.city}</h3>
                  <p className="sede-map__addr">
                    {s.address[0]}
                    <br />
                    {s.address[1]}
                  </p>
                  <dl className="sede-map__facts">
                    <div>
                      <dt>Teléfono</dt>
                      <dd>
                        {s.phones.map((p, j) => (
                          <span key={p}>
                            {j > 0 && ' · '}
                            <a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
                          </span>
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>
                        <a href={`mailto:${s.email}`}>{s.email}</a>
                      </dd>
                    </div>
                  </dl>
                  <div className="sede-map__links">
                    <a className="text-link" href={s.maps} target="_blank" rel="noreferrer">
                      Cómo llegar <ArrowRight size={18} aria-hidden="true" />
                    </a>
                    {s.site && (
                      <a className="text-link" href={s.site} target="_blank" rel="noreferrer">
                        Visitar su sitio <ArrowRight size={18} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
                {i === 0 && (
                  <div className="sede-map__frame">
                    <iframe
                      src={s.embed}
                      title={`Mapa de SOF ${s.city}`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Cierre
        title="¿Listo para tu control?"
        figure="?"
        figureLabel="Lámina de puntos con un signo de pregunta escondido"
        plateNumber={4}
        seed={80}
      >
        Pedí turno online en un minuto, o escribinos por WhatsApp y te respondemos en el horario de atención.
      </Cierre>
    </>
  )
}
