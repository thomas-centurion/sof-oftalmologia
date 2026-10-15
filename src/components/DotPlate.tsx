import { useEffect, useRef } from 'react'

interface DotPlateProps {
  /** Figura escondida en la lámina. */
  figure: string
  figureColors: string[]
  groundColors: string[]
  seed?: number
  /** Cantidad aproximada de intentos de ubicación; más intentos, puntos más apretados. */
  density?: number
  /** Lente que agranda y enfoca los puntos bajo el dedo o el puntero. */
  lens?: boolean
  /** Los puntos aparecen desde el centro al montar. */
  develop?: boolean
  /**
   * La figura empieza camuflada con colores de fondo y se enfoca cuando la
   * lámina entra en pantalla (y localmente bajo la lente).
   */
  reveal?: boolean
  /** Se dibuja apenas monta (lámina del primer viewport); el resto espera a estar cerca. */
  eager?: boolean
  /** Radio máximo de punto (en unidades del disco). Más chico, figura más nítida. */
  grain?: number
  /** Corrimiento horizontal de la figura, para alejarla de un borde recortado. */
  figureOffset?: number
  /** Ancho máximo de la figura como fracción del diámetro. */
  figureWidth?: number
  label: string
  className?: string
}

interface Dot {
  x: number
  y: number
  r: number
  color: string
  /** Color de fondo que usa un punto de la figura mientras está camuflado. */
  hidden: string | null
  delay: number
}

const FIGURE_FONT = '"Bricolage Grotesque Variable", system-ui, sans-serif'

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Empaqueta círculos de radio variable dentro de un disco unitario. */
function packDots(seed: number, attempts: number, rMax: number) {
  const rand = mulberry32(seed)
  const dots: { x: number; y: number; r: number }[] = []
  const rMin = rMax * 0.27
  const cell = rMax * 2
  const grid = new Map<string, number[]>()
  const key = (cx: number, cy: number) => `${cx},${cy}`
  const gap = rMax * 0.13

  for (let i = 0; i < attempts; i++) {
    // Los primeros intentos usan puntos grandes, luego se rellenan los huecos.
    const t = i / attempts
    const r = rMin + (rMax - rMin) * Math.pow(rand(), 0.6 + t * 2.2)
    const ang = rand() * Math.PI * 2
    const dist = Math.sqrt(rand()) * (1 - r)
    const x = Math.cos(ang) * dist
    const y = Math.sin(ang) * dist
    const cx = Math.floor(x / cell)
    const cy = Math.floor(y / cell)
    let ok = true
    for (let gx = cx - 1; gx <= cx + 1 && ok; gx++) {
      for (let gy = cy - 1; gy <= cy + 1 && ok; gy++) {
        const bucket = grid.get(key(gx, gy))
        if (!bucket) continue
        for (const idx of bucket) {
          const d = dots[idx]
          const dx = d.x - x
          const dy = d.y - y
          const min = d.r + r + gap
          if (dx * dx + dy * dy < min * min) {
            ok = false
            break
          }
        }
      }
    }
    if (!ok) continue
    const k = key(cx, cy)
    const bucket = grid.get(k)
    if (bucket) bucket.push(dots.length)
    else grid.set(k, [dots.length])
    dots.push({ x, y, r })
  }
  return dots
}

/**
 * Devuelve una función que decide si un punto pertenece a la figura según
 * cuánto de su superficie cae dentro del glifo (no solo su centro), con el
 * glifo apenas engrosado para que el borde no se deshaga entre puntos.
 */
function figureMask(figure: string, offset: number, maxWidth: number) {
  const size = 360
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const ctx = c.getContext('2d')
  if (!ctx) return () => false
  ctx.fillStyle = '#000'
  ctx.strokeStyle = '#000'
  ctx.lineJoin = 'round'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  // Cada glifo se dibuja aparte con aire entre letras, para que entre puntos
  // las letras no se fundan en una sola mancha.
  const glyphs = [...figure]
  const tracking = 0.18
  let fontSize = size * (glyphs.length > 2 ? 0.58 : glyphs.length === 2 ? 0.66 : 0.84)
  const layout = () => {
    ctx.font = `800 ${fontSize}px ${FIGURE_FONT}`
    const widths = glyphs.map((g) => ctx.measureText(g).width)
    const gap = fontSize * tracking
    const total = widths.reduce((a, b) => a + b, 0) + gap * (glyphs.length - 1)
    return { widths, gap, total }
  }
  let { widths, gap, total } = layout()
  if (total > size * maxWidth) {
    fontSize *= (size * maxWidth) / total
    ;({ widths, gap, total } = layout())
  }
  let x = size / 2 + (offset * size) / 2 - total / 2
  const cy = size / 2 + fontSize * 0.04
  ctx.lineWidth = size * 0.018
  glyphs.forEach((g, i) => {
    ctx.fillText(g, x, cy)
    ctx.strokeText(g, x, cy)
    x += widths[i] + gap
  })
  const data = ctx.getImageData(0, 0, size, size).data
  const inside = (x: number, y: number) => {
    const px = Math.min(size - 1, Math.max(0, Math.round(((x + 1) / 2) * (size - 1))))
    const py = Math.min(size - 1, Math.max(0, Math.round(((y + 1) / 2) * (size - 1))))
    return data[(py * size + px) * 4 + 3] > 110
  }
  return (x: number, y: number, r: number) => {
    const k = r * 0.55
    let hits = inside(x, y) ? 1 : 0
    hits += inside(x + k, y) ? 1 : 0
    hits += inside(x - k, y) ? 1 : 0
    hits += inside(x, y + k) ? 1 : 0
    hits += inside(x, y - k) ? 1 : 0
    return hits >= 3
  }
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

export function DotPlate({
  figure,
  figureColors,
  groundColors,
  seed = 7,
  density = 9000,
  lens = false,
  develop = false,
  reveal = false,
  eager = false,
  grain = 0.034,
  figureOffset = 0,
  figureWidth = 0.86,
  label,
  className,
}: DotPlateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let cancelled = false
    let dots: Dot[] = []
    let raf = 0
    let start = 0
    let pointer: { x: number; y: number } | null = null
    let hovering = false
    let lensAmount = 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animateIn = develop && !reduceMotion
    const camouflage = reveal && !reduceMotion
    // 0 = figura camuflada, 1 = figura visible.
    let focus = camouflage ? 0 : 1
    let focusTarget = focus

    const build = () => {
      const rand = mulberry32(seed * 31 + 3)
      const inFigure = figureMask(figure, figureOffset, figureWidth)
      dots = packDots(seed, density, grain).map((d) => {
        const fig = inFigure(d.x, d.y, d.r)
        const palette = fig ? figureColors : groundColors
        const dist = Math.hypot(d.x, d.y)
        return {
          ...d,
          color: palette[Math.floor(rand() * palette.length)],
          hidden: fig ? groundColors[Math.floor(rand() * groundColors.length)] : null,
          delay: dist * 650 + rand() * 260,
        }
      })
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
    }

    const draw = (now: number) => {
      const w = canvas.width
      const h = canvas.height
      const radius = Math.min(w, h) / 2
      const cx = w / 2
      const cy = h / 2
      const elapsed = animateIn ? now - start : Infinity
      ctx.clearRect(0, 0, w, h)

      lensAmount += ((hovering ? 1 : 0) - lensAmount) * 0.14
      focus += (focusTarget - focus) * 0.035
      if (Math.abs(focusTarget - focus) < 0.002) focus = focusTarget
      const lensR = radius * 0.36
      let settling = false

      for (const d of dots) {
        let s = 1
        if (animateIn) {
          const t = (elapsed - d.delay) / 700
          if (t <= 0) {
            settling = true
            continue
          }
          if (t < 1) settling = true
          s = easeOutExpo(Math.min(t, 1))
        }
        let x = cx + d.x * radius
        let y = cy + d.y * radius
        let k = 0
        if (lensAmount > 0.01 && pointer) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < lensR) {
            k = Math.cos((dist / lensR) * (Math.PI / 2)) * lensAmount
            s *= 1 + 0.42 * k
            x += dx * 0.18 * k
            y += dy * 0.18 * k
          }
        }
        const r = d.r * radius * s
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        const shown = d.hidden ? Math.max(focus, k) : 1
        if (shown >= 1 || !d.hidden) {
          ctx.globalAlpha = 1
          ctx.fillStyle = d.color
          ctx.fill()
        } else {
          ctx.globalAlpha = 1
          ctx.fillStyle = d.hidden
          ctx.fill()
          if (shown > 0) {
            ctx.globalAlpha = shown
            ctx.fillStyle = d.color
            ctx.fill()
            ctx.globalAlpha = 1
          }
        }
      }

      const moving = Math.abs((hovering ? 1 : 0) - lensAmount) > 0.01 || focus !== focusTarget
      if (!cancelled && (settling || moving)) raf = requestAnimationFrame(draw)
      else raf = 0
    }

    const kick = () => {
      if (!raf && !cancelled) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.buttons === 0 && e.type === 'pointermove') return
      const rect = canvas.getBoundingClientRect()
      const dpr = canvas.width / rect.width
      pointer = { x: (e.clientX - rect.left) * dpr, y: (e.clientY - rect.top) * dpr }
      hovering = true
      kick()
    }
    const onLeave = () => {
      hovering = false
      kick()
    }

    const ro = new ResizeObserver(() => {
      resize()
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(draw)
    })

    // La figura se enfoca cuando la lámina está bien a la vista.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            focusTarget = 1
            kick()
          }, animateIn ? 1100 : 250)
          io.disconnect()
        }
      },
      { threshold: 0.45 },
    )

    const init = () =>
      document.fonts
        .load(`800 100px ${FIGURE_FONT}`)
        .catch(() => undefined)
        .then(() => {
          if (cancelled) return
          build()
        resize()
        ro.observe(canvas)
        if (camouflage) io.observe(canvas)
        start = performance.now()
        raf = requestAnimationFrame(draw)
        if (lens && !reduceMotion) {
          canvas.addEventListener('pointermove', onMove)
          canvas.addEventListener('pointerdown', onMove)
          canvas.addEventListener('pointerleave', onLeave)
          canvas.addEventListener('pointerup', onLeave)
          canvas.addEventListener('pointercancel', onLeave)
        }
      })

    // Empaquetar miles de puntos cuesta: las láminas fuera de pantalla esperan
    // a estar cerca de verse, así la carga inicial no bloquea el hilo principal.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          near.disconnect()
          init()
        }
      },
      { rootMargin: '400px 0px' },
    )
    if (eager) init()
    else near.observe(canvas)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      near.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerdown', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointerup', onLeave)
      canvas.removeEventListener('pointercancel', onLeave)
    }
  }, [figure, figureColors, groundColors, seed, density, lens, develop, reveal, eager, grain, figureOffset, figureWidth])

  return <canvas ref={canvasRef} className={className} role="img" aria-label={label} />
}
