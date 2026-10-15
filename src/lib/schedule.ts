import { hours } from '../data/clinic'

const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

/** Fecha y hora actuales en Argentina, sin depender de la zona del visitante. */
export function nowInArgentina(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Argentina/Buenos_Aires',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0'
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day: weekday, hour: Number(get('hour')) + Number(get('minute')) / 60 }
}

export interface OpenStatus {
  open: boolean
  text: string
}

export function openStatus(date = new Date()): OpenStatus {
  const { day, hour } = nowInArgentina(date)
  const today = hours[day]
  if (today && hour >= today[0] && hour < today[1]) {
    return { open: true, text: `Abierto ahora · hasta las ${today[1]} h` }
  }
  if (today && hour < today[0]) {
    return { open: false, text: `Cerrado · abre hoy a las ${today[0]} h` }
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    const h = hours[d]
    if (h) {
      const when = i === 1 ? 'mañana' : `el ${dayNames[d]}`
      return { open: false, text: `Cerrado · abre ${when} a las ${h[0]} h` }
    }
  }
  return { open: false, text: 'Cerrado' }
}

export interface Slot {
  iso: string
  weekday: string
  day: number
  month: string
  saturday: boolean
}

/** Próximos días de atención (lunes a sábado), a partir de mañana. */
export function upcomingDays(count: number, from = new Date()): Slot[] {
  const out: Slot[] = []
  const d = new Date(from)
  d.setHours(12, 0, 0, 0)
  while (out.length < count) {
    d.setDate(d.getDate() + 1)
    const wd = d.getDay()
    if (!hours[wd]) continue
    out.push({
      iso: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', ''),
      day: d.getDate(),
      month: d.toLocaleDateString('es-AR', { month: 'long' }),
      saturday: wd === 6,
    })
  }
  return out
}
