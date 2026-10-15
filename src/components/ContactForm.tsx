import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { contact } from '../data/clinic'

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [tried, setTried] = useState(false)
  const [sent, setSent] = useState(false)
  const doneRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (sent) doneRef.current?.focus()
  }, [sent])

  const errors = {
    name: tried && name.trim().length < 3 ? 'Escribí tu nombre y apellido.' : null,
    email: tried && !emailOk(email) ? 'Revisá el email: necesitamos uno válido para responderte.' : null,
    message: tried && message.trim().length < 10 ? 'Contanos un poco más, al menos una oración.' : null,
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (name.trim().length < 3 || !emailOk(email) || message.trim().length < 10) return
    setSent(true)
  }

  if (sent) {
    return (
      <div className="contact-form contact-form--sent">
        <span className="turno__seal" aria-hidden="true">
          <Check size={28} strokeWidth={2.5} />
        </span>
        <h3 ref={doneRef} tabIndex={-1}>
          Gracias, {name.trim().split(' ')[0]}.
        </h3>
        <p>
          En un sitio real, la clínica te respondería a {email.trim()}. Este es un sitio de práctica y el formulario no
          envía datos: para consultas reales escribí a <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setSent(false)
            setTried(false)
            setName('')
            setEmail('')
            setPhone('')
            setMessage('')
          }}
        >
          Escribir otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="field field--wide">
        <label htmlFor="c-name">Nombre y apellido</label>
        <input
          id="c-name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'c-name-err' : undefined}
        />
        {errors.name && (
          <p className="field__err" id="c-name-err">
            {errors.name}
          </p>
        )}
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input
          id="c-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'c-email-err' : undefined}
        />
        {errors.email && (
          <p className="field__err" id="c-email-err">
            {errors.email}
          </p>
        )}
      </div>
      <div className="field">
        <label htmlFor="c-phone">
          Teléfono <span className="field__opt">(opcional)</span>
        </label>
        <input
          id="c-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="field field--wide">
        <label htmlFor="c-msg">Mensaje</label>
        <textarea
          id="c-msg"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'c-msg-err' : 'c-msg-hint'}
        />
        {errors.message ? (
          <p className="field__err" id="c-msg-err">
            {errors.message}
          </p>
        ) : (
          <p className="field__hint" id="c-msg-hint">
            Para pedir turno usá el formulario de turnos, es más rápido.
          </p>
        )}
      </div>
      <div className="contact-form__foot">
        <button type="submit" className="btn btn--primary">
          Enviar mensaje <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
