import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Cierre } from '../components/Cierre'
import { DotPlate } from '../components/DotPlate'
import { OLIVE_GROUND, WARM_FIGURE } from '../components/plates'
import { contact, hours } from '../data/clinic'

const pillars = [
  {
    title: 'Servicios de calidad',
    text: 'Oftalmología clínica y quirúrgica de alta complejidad para adultos y niños, en un mismo lugar.',
  },
  {
    title: 'Tecnología de avanzada',
    text: 'Consultorios y salas de cirugía con equipamiento de última generación, renovado con la innovación en aparatología.',
  },
  {
    title: 'Staff integral',
    text: 'Un modelo de trabajo multidisciplinario, con especialidades y subespecialidades que trabajan juntas.',
  },
  {
    title: 'Centros propios',
    text: 'Sedes propias en Pergamino, Buenos Aires y Córdoba, unidas por la misma red.',
  },
]

export function Nosotros() {
  return (
    <>
      <section className="page-head">
        <div className="wrap page-head__grid">
          <div className="page-head__copy">
            <h1>
              La salud de tus ojos <span>es nuestro compromiso.</span>
            </h1>
            <p className="page-head__lead">
              Somos un centro de alta complejidad especializado en oftalmología clínica y quirúrgica para adultos y
              niños, en el centro de Pergamino.
            </p>
          </div>
          <figure className="page-head__plate">
            <DotPlate
              className="plate"
              figure="P"
              figureColors={WARM_FIGURE}
              groundColors={OLIVE_GROUND}
              seed={63}
              density={24000}
              grain={0.026}
              figureOffset={-0.12}
              figureWidth={0.6}
              develop
              reveal
              lens
              eager
              label="Lámina de puntos con la letra P escondida"
            />
            <figcaption>
              <strong>Lámina 1.</strong> P de Pergamino: estamos en Bartolomé Mitre 882.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="historia" aria-labelledby="historia-title">
        <div className="wrap historia__grid">
          <h2 id="historia-title">Cómo nació SOF Pergamino.</h2>
          <div className="historia__text">
            <p className="historia__first">
              SOF Pergamino nace de un acuerdo científico e intelectual entre profesionales de excelencia de la ciudad y
              las clínicas SOF de Córdoba y Buenos Aires.
            </p>
            <p>
              El objetivo es brindar asistencia oftalmológica de primer nivel a la población de Pergamino y alrededores.
            </p>
            <p>
              Nuestros valores de compromiso y profesionalidad nos motivan a la formación constante. Parte del equipo
              integra la Academia Americana de Oftalmología, la Academia Europea de Oftalmología y el CONICET.
            </p>
            <Link to="/staff" className="text-link">
              Conocé al equipo <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="pilares" aria-labelledby="pilares-title">
        <div className="wrap">
          <div className="section-head section-head--light">
            <h2 id="pilares-title">Lo que nos define.</h2>
          </div>
          <ul className="pilares__list">
            {pillars.map((p) => (
              <li key={p.title} className="pilar">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="practico" aria-labelledby="practico-title">
        <div className="wrap practico__grid">
          <div className="section-head">
            <h2 id="practico-title">Para tu visita.</h2>
            <p>Atendemos pacientes particulares y con obras sociales.</p>
          </div>
          <dl className="practico__facts">
            <div>
              <dt>Dirección</dt>
              <dd>
                Bartolomé Mitre 882
                <br />
                Pergamino, Buenos Aires
              </dd>
            </div>
            <div>
              <dt>Horarios</dt>
              <dd>
                Lunes a viernes, {hours[1]![0]} a {hours[1]![1]} h
                <br />
                Sábados, {hours[6]![0]} a {hours[6]![1]} h
              </dd>
            </div>
            <div>
              <dt>Coberturas</dt>
              <dd>Más de 50 obras sociales y prepagas, y pacientes particulares.</dd>
            </div>
            <div>
              <dt>Teléfono</dt>
              <dd>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Cierre
        title="Vení a conocernos."
        figure="?"
        figureLabel="Lámina de puntos con un signo de pregunta escondido"
        plateNumber={2}
        seed={79}
      >
        Pedí turno online en un minuto, o escribinos por WhatsApp y te respondemos en el horario de atención.
      </Cierre>
    </>
  )
}
