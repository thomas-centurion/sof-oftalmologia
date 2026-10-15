export type AreaId = 'anterior' | 'retina' | 'pediatria' | 'general'

export interface Area {
  id: AreaId
  name: string
  short: string
  description: string
  /** Gama de puntos que identifica al área en todo el sitio. */
  dots: string[]
  /** Tono sólido para chips y marcas. */
  tone: string
}

export const areas: Record<AreaId, Area> = {
  anterior: {
    id: 'anterior',
    name: 'Segmento anterior',
    short: 'Córnea, cristalino y cirugía refractiva',
    description:
      'Cataratas, queratocono, miopía y astigmatismo. Oftalmólogos de gran experiencia y en constante innovación.',
    dots: ['#E2572B', '#EE7A45', '#C9441F', '#F29A6B'],
    tone: '#E2572B',
  },
  retina: {
    id: 'retina',
    name: 'Retina',
    short: 'Mácula, retina y vítreo',
    description:
      'Equipamiento y prácticas de vanguardia para tratar maculopatías, retinopatía diabética y desprendimiento de retina.',
    dots: ['#2F5D4E', '#4E7A4C', '#3F6E5E', '#6E8C55'],
    tone: '#2F5D4E',
  },
  pediatria: {
    id: 'pediatria',
    name: 'Oftalmopediatría',
    short: 'Desde el día del nacimiento',
    description:
      'Especialistas en oftalmología infantil: fondo de ojo al recién nacido, estrabismo y cirugías pediátricas.',
    dots: ['#F0A04B', '#E8B64A', '#E38F3A', '#F3C06A'],
    tone: '#E8A23F',
  },
  general: {
    id: 'general',
    name: 'Consulta general',
    short: 'Control, recetas y campo visual',
    description: 'Consulta oftalmológica, receta de lentes, campimetría y cirugía de párpados y conjuntiva.',
    dots: ['#7C8F3A', '#94A04A', '#6B7D30', '#A7AE5A'],
    tone: '#7C8F3A',
  },
}

export const areaOrder: AreaId[] = ['anterior', 'retina', 'pediatria', 'general']

export type ServiceKind = 'Estudio' | 'Cirugía'

export interface Service {
  name: string
  detail?: string
  kind: ServiceKind
  area: AreaId
}

export const services: Service[] = [
  { name: 'Angio OCT', kind: 'Estudio', area: 'retina' },
  { name: 'Campimetría computarizada', kind: 'Estudio', area: 'general' },
  { name: 'Ecografía modo A y B', kind: 'Estudio', area: 'retina' },
  { name: 'Angiografía de retina', kind: 'Estudio', area: 'retina' },
  { name: 'IOL Master', detail: 'cálculo de lentes intraoculares', kind: 'Estudio', area: 'anterior' },
  { name: 'Microscopía especular', detail: 'recuento endotelial', kind: 'Estudio', area: 'anterior' },
  { name: 'OCT', detail: 'tomografía de coherencia óptica', kind: 'Estudio', area: 'retina' },
  { name: 'Paquimetría', kind: 'Estudio', area: 'anterior' },
  { name: 'Pentacam', kind: 'Estudio', area: 'anterior' },
  { name: 'Receta de lentes por computación', kind: 'Estudio', area: 'general' },
  { name: 'Retinalyze', kind: 'Estudio', area: 'retina' },
  { name: 'Topografía corneal', kind: 'Estudio', area: 'anterior' },
  { name: 'UBM', detail: 'ultrabiomicroscopía', kind: 'Estudio', area: 'anterior' },
  { name: 'Fondo de ojo al recién nacido', kind: 'Estudio', area: 'pediatria' },
  { name: 'Cataratas', kind: 'Cirugía', area: 'anterior' },
  { name: 'Anillos intracorneales', kind: 'Cirugía', area: 'anterior' },
  { name: 'Cross linking', kind: 'Cirugía', area: 'anterior' },
  { name: 'Excimer láser, Lasik y PRK', kind: 'Cirugía', area: 'anterior' },
  { name: 'Facorrefractiva', kind: 'Cirugía', area: 'anterior' },
  { name: 'YAG láser', kind: 'Cirugía', area: 'anterior' },
  { name: 'Desprendimiento de retina', kind: 'Cirugía', area: 'retina' },
  { name: 'Láser de argón', kind: 'Cirugía', area: 'retina' },
  { name: 'Estrabismo', kind: 'Cirugía', area: 'pediatria' },
  { name: 'Cirugías pediátricas', kind: 'Cirugía', area: 'pediatria' },
  { name: 'Párpados y conjuntiva', kind: 'Cirugía', area: 'general' },
]

export interface Doctor {
  name: string
  initials: string
  training: string
  focus: string
  /** Solo cuando la fuente respalda la subespecialidad. */
  area?: AreaId
}

export const staff: Doctor[] = [
  {
    name: 'Dra. Vanesa Galli',
    initials: 'VG',
    training: 'Médica cirujana (UNR)',
    focus: 'Especialista en oftalmología',
  },
  {
    name: 'Dr. Sebastián Basualdo',
    initials: 'SB',
    training: 'Médico cirujano (UNC)',
    focus: 'Especialista en oftalmología',
  },
  {
    name: 'Dr. Leroy Di Dionisio',
    initials: 'LD',
    training: 'Médico cirujano',
    focus: 'Especialista en oftalmología',
  },
  {
    name: 'Dr. Juan Carlos De Pedro',
    initials: 'JD',
    training: 'Especialista en oftalmología',
    focus: 'Neurooftalmología pediátrica',
    area: 'pediatria',
  },
  {
    name: 'Dr. Jeremías Galletti',
    initials: 'JG',
    training: 'Médico cirujano (UBA)',
    focus: 'Especialista en oftalmología (HC)',
  },
]

export interface Sede {
  id: string
  city: string
  address: string[]
  phones: string[]
  email: string
  site?: string
  maps: string
  /** Mapa embebido de Google Maps (URL del sitio original). */
  embed: string
}

export const sedes: Sede[] = [
  {
    id: 'pergamino',
    city: 'Pergamino',
    address: ['Bartolomé Mitre 882', 'Pergamino, Buenos Aires · CP 2700'],
    phones: ['02477 410287'],
    email: 'info@sofpergamino.com.ar',
    maps: 'https://www.google.com/maps/search/?api=1&query=Bartolom%C3%A9+Mitre+882+Pergamino',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.838071375824!2d-60.57825928478916!3d-33.89382398064933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b9b556afbb17a9%3A0xe4803b4248db47f7!2sBartolom%C3%A9+Mitre+882%2C+Pergamino%2C+Buenos+Aires!5e0!3m2!1ses-419!2sar!4v1543249073138',
  },
  {
    id: 'buenos-aires',
    city: 'Buenos Aires',
    address: ['Av. Triunvirato 3176, 1.er piso', 'Villa Ortúzar, CABA'],
    phones: ['0810 268 0101'],
    email: 'info@sofbuenosaires.com.ar',
    site: 'https://www.sofbuenosaires.com.ar/',
    maps: 'https://www.google.com/maps/search/?api=1&query=Av+Triunvirato+3176+CABA',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.793678188086!2d-58.46931418477071!3d-34.58408678046455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb60b0d9e6131%3A0xdddd53066051f549!2sAv+Triunvirato+3176%2C+Buenos+Aires!5e0!3m2!1ses-419!2sar!4v1520430154695',
  },
  {
    id: 'cordoba',
    city: 'Córdoba',
    address: ['Nicolás Avellaneda 330, 3.er piso', 'Centro, Córdoba'],
    phones: ['0351 4217910', '0351 4235148'],
    email: 'info@sofoftalmologia.com.ar',
    site: 'https://www.sofoftalmologia.com.ar',
    maps: 'https://www.google.com/maps/search/?api=1&query=Nicol%C3%A1s+Avellaneda+330+C%C3%B3rdoba',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.2039492676035!2d-64.19681318524334!3d-31.408506481406786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432987df0fc4d33%3A0x96ab4f01de307254!2sNicol%C3%A1s+Avellaneda+330%2C+X5000LJH+C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1485190557711',
  },
]

export const contact = {
  phone: '02477 410287',
  phoneHref: 'tel:+542477410287',
  whatsapp: 'https://api.whatsapp.com/send?phone=5492477345006',
  whatsappLabel: '+54 9 2477 34-5006',
  email: 'info@sofpergamino.com.ar',
  turnosEmail: 'turnos@sofpergamino.com.ar',
  instagram: 'https://www.instagram.com/sof.oftalmologia/',
  instagramHandle: '@sof.oftalmologia',
}

/** Horario de SOF Pergamino. 0 = domingo. */
export const hours: Record<number, [number, number] | null> = {
  0: null,
  1: [9, 17],
  2: [9, 17],
  3: [9, 17],
  4: [9, 17],
  5: [9, 17],
  6: [9, 13],
}
