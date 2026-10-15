/** Título y descripción de cada ruta, para la pestaña, lectores de pantalla y vistas previas. */
const SITE = 'SOF Pergamino'
const ORIGIN = 'https://sof-pergamino.thomas-centurion.workers.dev'

const pages: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${SITE} · Oftalmología de alta complejidad`,
    description:
      'Oftalmología clínica y quirúrgica para adultos y niños en Bartolomé Mitre 882, Pergamino. Pedí tu turno online.',
  },
  '/servicios': {
    title: `Estudios y cirugías · ${SITE}`,
    description:
      'Estudios oftalmológicos y cirugías de segmento anterior, retina, oftalmopediatría y consulta general en SOF Pergamino.',
  },
  '/staff': {
    title: `Equipo médico · ${SITE}`,
    description: 'Los oftalmólogos de SOF Pergamino, con formación en la UNR, la UNC y la UBA.',
  },
  '/nosotros': {
    title: `Nosotros · ${SITE}`,
    description:
      'Centro de alta complejidad en oftalmología clínica y quirúrgica, parte de la red SOF junto a Córdoba y Buenos Aires.',
  },
  '/contacto': {
    title: `Contacto y sedes · ${SITE}`,
    description: 'Teléfono, WhatsApp, email y las tres sedes de la red SOF: Pergamino, Buenos Aires y Córdoba.',
  },
}

const notFound = {
  title: `Página no encontrada · ${SITE}`,
  description: 'La página que buscás no existe. Volvé al inicio de SOF Pergamino.',
}

export function applyPageMeta(pathname: string) {
  const meta = pages[pathname] ?? notFound
  document.title = meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
  const url = ORIGIN + (pages[pathname] ? pathname : '/')
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
}
