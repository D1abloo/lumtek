# Lumtek Web

Landing de **Lumtek** — domótica, sistemas inteligentes, videovigilancia e IoT.

Stack: React 19 · TypeScript · Vite · Tailwind · Framer Motion · React Router.

**Montaje completo en VPS (dominio nip.io + Nginx + SSL):** [`../docs/VPS.md`](../docs/VPS.md)  
**Deploy rápido:** `bash deploy/deploy.sh` (tras `npm install` y build)

---

## Producción (VPS)

| Concepto | Valor |
|----------|--------|
| URL | https://lumtek.31.70.109.174.nip.io |
| Servidor | `root@31.70.109.174` (Ubuntu) |
| Web estática | `/var/www/lumtek` |
| Nginx site | `/etc/nginx/sites-available/lumtek` → `sites-enabled/lumtek` |
| SSL | Let's Encrypt (Certbot), renueva solo |
| Dominio | [nip.io](https://nip.io) gratuito (`lumtek.31.70.109.174.nip.io` → IP del VPS) |

Nginx sirve el build de Vite como SPA (`try_files` → `index.html`). Los assets (`.js`, `.css`, imágenes) tienen caché de 7 días.

**Formulario de contacto en producción:** el deploy actual es solo estático. El endpoint `/api/contact` vive en `server/index.mjs` (Node) y **no está desplegado** en la VPS. Para que el formulario envíe correo hay que levantar ese servidor (o proxy nginx → Node) y configurar `SMTP_PASS` en `.env`. Ver sección [API de contacto](#api-de-contacto).

---

## Desarrollo local

```bash
cd lumtek-web
npm install
npm run dev          # front → http://localhost:5173
npm run dev:api      # API contacto → http://localhost:3001 (otra terminal)
```

Vista previa del build:

```bash
npm run build
npm run preview      # http://localhost:4173
```

Recarga forzada si no ves cambios en el navegador: `Ctrl+Shift+R`.

---

## Desplegar cambios en la VPS

Desde tu máquina, en `lumtek-web`:

```bash
npm run build
scp -r dist/. root@31.70.109.174:/var/www/lumtek/
ssh root@31.70.109.174 "chown -R www-data:www-data /var/www/lumtek"
```

Comprobar:

```bash
curl -sI https://lumtek.31.70.109.174.nip.io/ | head -3
```

Abrir la URL y recargar con `Ctrl+Shift+R` (la caché de JS/CSS puede ocultar el bundle nuevo).

### Si tocas nginx o SSL (raro)

En el servidor:

```bash
nginx -t && systemctl reload nginx
certbot renew --dry-run   # comprobar renovación SSL
```

---

## Mapa del proyecto — qué tocar según el cambio

### Layout global (header, footer, navegación)

| Qué | Archivo |
|-----|---------|
| Menú, logo, botón Contactar | `src/components/layout/Header.tsx` |
| Pie, enlaces legales | `src/components/layout/Footer.tsx` |
| Items del menú | `src/data/siteContent.ts` → `navItems` |
| Rutas de la app | `src/App.tsx` |

### Textos y datos de marca

| Qué | Archivo |
|-----|---------|
| Teléfono, email, hero, claim | `src/data/siteContent.ts` |
| Servicios | `src/data/services.ts` |
| Reseñas | `src/data/reviews.ts` |
| Casos de uso (listado) | `src/data/useCases.ts` |
| Texto por caso de uso | `src/data/useCaseContent.ts` |
| Legal (aviso, privacidad, cookies) | `src/data/legalContent.ts` |
| Opciones formulario contacto | `src/data/contactOptions.ts` |

### Páginas

| Ruta | Archivo |
|------|---------|
| `/` | `src/pages/HomePage.tsx` |
| `/contacto` | `src/pages/ContactPage.tsx` |
| `/casos/:slug` | `src/pages/UseCasePage.tsx` |
| Aviso / privacidad / cookies | `src/pages/LegalNoticePage.tsx`, etc. |

### Secciones de la home

| Sección | Componente |
|---------|------------|
| Hero principal | `src/components/hero/Hero.tsx` |
| Beneficios | `src/components/sections/BenefitsStrip.tsx` |
| Servicios | `src/components/sections/ServicesSection.tsx` |
| Domótica | `src/components/sections/DomoticsSection.tsx` |
| Core / nodos | `src/components/sections/CoreSection.tsx` + `src/data/coreNodes.ts` |
| Seguridad, proceso, reseñas… | `src/components/sections/*.tsx` |
| Contacto (bloque en home) | `src/components/contact/ContactSection.tsx` |
| Formulario | `src/components/contact/ContactForm.tsx` |

### Móvil interactivo del hero (Lumtek Control)

| Qué | Archivo |
|-----|---------|
| Marco del teléfono, glow | `src/components/hero/PhoneDemo.tsx` |
| Bloqueo / desbloqueo, timer 15 s | `src/components/hero/LiveCameraPreview.tsx` |
| Pantalla de bloqueo (logo) | `src/components/hero/PhoneLockedScreen.tsx` |
| Menú de secciones (rayo eléctrico) | `src/components/hero/LumtekSectionMenu.tsx` |
| Detalle de sección | `src/components/hero/LumtekSectionDetail.tsx` |
| Navegación ← / → | `src/components/hero/PhoneNavBar.tsx` |
| Orquestación de pantallas | `src/components/hero/LumtekControlApp.tsx` |
| Animación letra a letra | `src/components/hero/AnimatedLetters.tsx` |
| Fondo montaña (solo menú) | `src/components/hero/MountainBackdrop.tsx` |
| Hotspots en imagen domótica | `src/data/sectionHotspots.ts`, `src/data/domoticHotspots.ts` |
| Secciones del menú (Puertas, Cámaras…) | `src/data/appSections.ts` |
| Rutas de imágenes hero | `src/data/heroAssets.ts` |
| Cámaras ficticias en vivo | `src/data/cameras.ts` |

### Imágenes y assets estáticos

| Qué | Dónde |
|-----|--------|
| Imágenes públicas (URLs `/images/...`) | `public/images/` |
| Montaña del móvil | `public/images/hero/montana.webp` (regenerar: `python3 scripts/build-montaña-webp.py`) |
| Captura domótica del móvil | `public/images/hero/domotica.webp` |
| Favicon, PWA | `public/favicon.svg`, `public/manifest.webmanifest`, `public/sw.js` |
| Estilos globales, utilidades Tailwind | `src/index.css`, `tailwind.config.js` |

### UI reutilizable

| Qué | Archivo |
|-----|---------|
| Botones con gradiente | `src/components/ui/GlowButton.tsx` |
| Efecto hover en enlaces nav | `src/components/ui/CursorFill.tsx` |
| Logo | `src/components/ui/LumtekLogo.tsx` |

### API de contacto

| Qué | Archivo |
|-----|---------|
| Servidor Express + SMTP | `server/index.mjs` |
| Cliente del formulario | `src/services/contactService.ts` |
| Variables de entorno | `.env` (copiar de `.env.example`) |

Variables típicas en `.env`:

```env
VITE_CONTACT_ENDPOINT=/api/contact
SMTP_PASS=...
MAIL_TO=juanf.delgado@lumtek.es
```

En local: `npm run dev` + `npm run dev:api`. En producción con Node: `npm run build && npm start` (puerto `3001` por defecto) y proxy nginx de `/api` al proceso Node.

---

## Rutas públicas

| Ruta | Contenido |
|------|-----------|
| `/` | Home completa |
| `/contacto` | Formulario |
| `/aviso-legal` | Aviso legal |
| `/politica-privacidad` | Privacidad |
| `/politica-cookies` | Cookies |
| `/configuracion-cookies` | Panel cookies |
| `/casos/:slug` | Página por caso de uso |

---

## Comandos útiles

```bash
npm run lint       # oxlint
npm run build      # genera dist/ para producción
```

---

## Flujo rápido (resumen)

1. Editar el archivo del mapa anterior según lo que quieras cambiar.
2. `npm run dev` → ver en http://localhost:5173
3. `npm run build` → comprobar que compila.
4. Subir `dist/` a `/var/www/lumtek` en la VPS.
5. Abrir https://lumtek.31.70.109.174.nip.io con recarga forzada.
