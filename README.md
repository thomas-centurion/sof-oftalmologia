# SOF Pergamino · Rediseño

Rediseño de práctica del sitio de SOF Pergamino, clínica oftalmológica de Pergamino. **No es el sitio oficial** y el formulario de turnos no envía datos.

En vivo: https://sof-pergamino.thomas-centurion.workers.dev

## Qué tiene

- Cinco páginas: Inicio, Servicios, Staff, Nosotros y Contacto.
- Estilo inspirado en las láminas del test de Ishihara: campos de puntos dibujados en canvas que esconden letras.
- Formulario de turnos en tres pasos y formulario de contacto (solo maqueta).
- Pensado para celular y para personas con baja visión (tipografía Atkinson Hyperlegible, buen contraste).

## Tecnología

React + TypeScript + Vite, publicado en Cloudflare Workers.

## Uso

```bash
npm install
npm run dev      # servidor local
npm run build    # build de producción
npm run deploy   # build + publicar en Cloudflare
```
