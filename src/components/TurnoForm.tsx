import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { areas, contact, type AreaId } from '../data/clinic'
import { upcomingDays } from '../lib/schedule'

type Franja = 'mañana' | 'tarde'

const stations = ['Motivo', 'Día', 'Tus datos'] as const

const reasons: { id: AreaId; label: string; hint: string }[] = [
  { id: 'general', label: 'Consulta o control', hint: 'Receta, control anual, campo visual' },
  { id: 'anterior', label: areas.anterior.name, hint: 'Cataratas, córnea, miopía' },
  { id: 'retina', label: areas.retina.name, hint: 'Mácula, diabetes, desprendimiento' },
  { id: 'pediatria', label: areas.pediatria.name, hint: 'Bebés, niñas y niños' },
]

export function TurnoForm({ id }: { id?: string }) {
  const days = useMemo(() => upcomingDays(12), [])
  const [step, setStep] = useState(0)
  const [area, setArea] = useState<AreaId | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [franja, setFranja] = useState<Franja>('mañana')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [cobertura, setCobertura] = useState('')
  const [tried, setTried] = useState(false)
  const [sent, setSent] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)

  const day = days.find((d) => d.iso === date)
  const phoneDigits = phone.replace(/\D/g, '')
  const nameError = tried && name.trim().length < 3 ? 'Escribí tu nombre y apellido.' : null
  const phoneError =
    tried && phoneDigits.length < 8 ? 'Necesitamos un teléfono con código de área para llamarte.' : null

  const canAdvance = step === 0 ? area !== null : step === 1 ? date !== null : true

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step, sent])

  const pickDay = (iso: string, saturday: boolean) => {
    setDate(iso)
    if (saturday) setFranja('mañana')
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (step < 2) {
      if (canAdvance) setStep(step + 1)
      return
    }
    setTried(true)
    if (name.trim().length < 3 || phoneDigits.length < 8) return
    setSent(true)
  }

  const reset = () => {
    setSent(false)
    setStep(0)
    setArea(null)
    setDate(null)
    setName('')
    setPhone('')
    setCobertura('')
    setTried(false)
  }

  const summary = [
    area ? reasons.find((r) => r.id === area)?.label : null,
    day ? `${day.weekday} ${day.day} de ${day.month}, por la ${franja}` : null,
    cobertura.trim() || null,
  ].filter(Boolean)

  if (sent && area && day) {
    return (
      <section className="turno turno--sent" id={id} aria-labelledby="turno-title">
        <span className="turno__seal" aria-hidden="true">
          <Check size={28} strokeWidth={2.5} />
        </span>
        <h2 id="turno-title" ref={headingRef} tabIndex={-1}>
          Listo, {name.trim().split(' ')[0]}.
        </h2>
        <p className="turno__lead">
          Pediste turno de <strong>{reasons.find((r) => r.id === area)?.label.toLowerCase()}</strong> para el{' '}
          <strong>
            {day.weekday} {day.day} de {day.month}
          </strong>{' '}
          por la {franja}. En un sitio real, la clínica te llamaría al {phone} para confirmar el horario.
        </p>
        <p className="turno__note">
          Este es un sitio de práctica y el formulario no envía datos. Para un turno de verdad llamá al{' '}
          <a href={contact.phoneHref}>{contact.phone}</a>.
        </p>
        <button type="button" className="btn btn--ghost" onClick={reset}>
          Pedir otro turno
        </button>
      </section>
    )
  }

  return (
    <section className="turno" id={id} aria-labelledby="turno-title">
      <div className="turno__head">
        <h2 id="turno-title" ref={headingRef} tabIndex={-1}>
          Pedí tu turno
        </h2>
        <ol className="stations" aria-label="Pasos">
          {stations.map((s, i) => (
            <li key={s} className={i === step ? 'is-current' : i < step ? 'is-done' : ''}>
              <button
                type="button"
                onClick={() => setStep(i)}
                disabled={i > step}
                aria-current={i === step ? 'step' : undefined}
              >
                <span className="stations__dot" aria-hidden="true" />
                {s}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <form onSubmit={submit} noValidate>
        {step === 0 && (
          <fieldset className="station">
            <legend className="sr-only">¿Por qué nos consultás?</legend>
            <p className="station__q" aria-hidden="true">
              ¿Por qué nos consultás?
            </p>
            <div className="reasons">
              {reasons.map((r) => (
                <label key={r.id} className="reason" style={{ '--tone': areas[r.id].tone } as CSSProperties}>
                  <input
                    type="radio"
                    name="area"
                    value={r.id}
                    checked={area === r.id}
                    onChange={() => setArea(r.id)}
                  />
                  <span className="reason__dot" aria-hidden="true" />
                  <span className="reason__text">
                    <span className="reason__label">{r.label}</span>
                    <span className="reason__hint">{r.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="station">
            <legend className="sr-only">Elegí un día y una franja</legend>
            <p className="station__q" aria-hidden="true">
              ¿Qué día te queda bien?
            </p>
            <div className="days">
              {days.map((d) => (
                <label key={d.iso} className="day">
                  <input
                    type="radio"
                    name="day"
                    value={d.iso}
                    checked={date === d.iso}
                    onChange={() => pickDay(d.iso, d.saturday)}
                  />
                  <span className="day__wd">{d.weekday}</span>
                  <span className="day__n">{d.day}</span>
                </label>
              ))}
            </div>
            <div className="franjas">
              {(['mañana', 'tarde'] as Franja[]).map((f) => {
                const off = f === 'tarde' && day?.saturday
                return (
                  <label key={f} className={`franja${off ? ' is-off' : ''}`}>
                    <input
                      type="radio"
                      name="franja"
                      value={f}
                      checked={franja === f}
                      disabled={off}
                      onChange={() => setFranja(f)}
                    />
                    <span>
                      Por la {f}
                      <small>{f === 'mañana' ? '9 a 13 h' : off ? 'Sábados, solo mañana' : '13 a 17 h'}</small>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="station station--fields">
            <legend className="sr-only">Tus datos</legend>
            <div className="field">
              <label htmlFor="t-name">Nombre y apellido</label>
              <input
                id="t-name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!nameError}
                aria-describedby={nameError ? 't-name-err' : undefined}
              />
              {nameError && (
                <p className="field__err" id="t-name-err">
                  {nameError}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="t-phone">Teléfono</label>
              <input
                id="t-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="02477 15 123456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={!!phoneError}
                aria-describedby={phoneError ? 't-phone-err' : undefined}
              />
              {phoneError && (
                <p className="field__err" id="t-phone-err">
                  {phoneError}
                </p>
              )}
            </div>
            <div className="field field--wide">
              <label htmlFor="t-cob">
                Obra social o prepaga <span className="field__opt">(opcional)</span>
              </label>
              <input
                id="t-cob"
                list="coberturas"
                placeholder="Particular, IOMA, OSDE…"
                value={cobertura}
                onChange={(e) => setCobertura(e.target.value)}
              />
              <datalist id="coberturas">
                <option value="Particular" />
                <option value="IOMA" />
                <option value="PAMI" />
                <option value="OSDE" />
                <option value="Swiss Medical" />
                <option value="Galeno" />
              </datalist>
            </div>
          </fieldset>
        )}

        <div className="turno__foot">
          <p className="preview" aria-live="polite">
            {summary.length ? (
              summary.map((s, i) => (
                <span key={i} className="preview__chip">
                  {s}
                </span>
              ))
            ) : (
              <span className="preview__empty">Tres pasos, menos de un minuto.</span>
            )}
          </p>
          <div className="turno__actions">
            {step > 0 && (
              <button type="button" className="btn btn--icon" onClick={() => setStep(step - 1)} aria-label="Volver">
                <ArrowLeft size={20} />
              </button>
            )}
            <button type="submit" className="btn btn--primary" disabled={!canAdvance}>
              {step < 2 ? 'Siguiente' : 'Solicitar turno'}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
