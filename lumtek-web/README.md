# Lumtek Web

Landing de **Lumtek** — domótica, sistemas inteligentes, videovigilancia e IoT.

Stack: React 19 · TypeScript · Vite · Tailwind · Framer Motion · React Router.

**Migración a lumtek.es:** [`../docs/DOMINIO-LUMTEK-ES.md`](../docs/DOMINIO-LUMTEK-ES.md)  
**Montaje VPS (Nginx + SSL):** [`../docs/VPS.md`](../docs/VPS.md)  
**Mapa infraestructura (header, hero, footer, API…):** [`../docs/INFRAESTRUCTURA.md`](../docs/INFRAESTRUCTURA.md)  
**Deploy rápido:** `bash deploy/deploy.sh` (tras `npm install` y build)

---

## Producción (VPS)

| Concepto | Valor |
|----------|--------|
| URL | https://lumtek.es |
| Servidor | `root@31.70.109.174` (Ubuntu) |
| Web estática | `/var/www/lumtek` |
| API contacto (Node) | `/var/www/lumtek-app` |
| `.env` SMTP producción | `/var/www/lumtek-app/.env` |
| Plantillas correo | `/var/www/lumtek-app/server/contactEmail.mjs` |
| Nginx site | `/etc/nginx/sites-available/lumtek` → `sites-enabled/lumtek` |
| Servicio API | `systemctl status lumtek-api` |
| SSL | Let's Encrypt (Certbot), renueva solo |
| Dominio | `lumtek.es` + `www.lumtek.es` (DNS Cloudflare → `31.70.109.174`) |

Nginx sirve el build de Vite como SPA (`try_files` → `index.html`) y hace **proxy de `/api/`** al proceso Node en el puerto `3001`.

**Formulario de contacto:** API desplegada en `/var/www/lumtek-app`. Solo falta `SMTP_PASS` en `.env` del servidor. Ver [API de contacto](#api-de-contacto) y [`../README.md`](../README.md).

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

```bash
cd lumtek-web
bash deploy/deploy-all.sh    # front + API
# o por separado:
bash deploy/deploy.sh        # solo estático
bash deploy/deploy-api.sh    # solo API / correos
```

Comprobar:

```bash
curl -sI https://lumtek.es/ | head -3
curl -s https://lumtek.es/api/health
```

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
| `/aplicaciones/:slug` | `src/pages/UseCasePage.tsx` |
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
| **Plantillas correo** (interno + cliente) | `server/contactEmail.mjs` |
| Cliente del formulario | `src/services/contactService.ts` |
| Variables entorno local | `.env` (copiar de `.env.example`) |
| Plantilla `.env` producción | `deploy/env.production.template` |
| Deploy API | `deploy/deploy-api.sh` |

Variables en `.env` / `/var/www/lumtek-app/.env`:

```env
SMTP_USER=juanf.delgado@lumtek.es
SMTP_PASS=...                    # contraseña del buzón GoDaddy
MAIL_TO=juanf.delgado@lumtek.es
MAIL_CLIENT_CONFIRM=true         # correo automático al cliente
```

Editar textos del correo: `server/contactEmail.mjs` → `bash deploy/deploy-api.sh`.

En local: `npm run dev` + `npm run dev:api`. Probar plantillas: `node server/contactEmail.mjs`.

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
| `/aplicaciones/:slug` | Página por caso de uso |

---

## PWA (aplicación instalable)

La web es una **Progressive Web App**: se puede añadir a la pantalla de inicio en móvil y tablet o instalar en escritorio.

| Archivo | Rol |
|---------|-----|
| `public/manifest.webmanifest` | Nombre, iconos, tema, atajos |
| `public/sw.js` | Caché offline básica |
| `src/registerPwa.ts` | Registro del service worker |

**Probar en Chrome:** F12 → icono de dispositivo → elegir iPhone, iPad o dimensiones responsive. En escritorio, busca el icono de instalación en la barra de direcciones.

**Breakpoints Tailwind:** `xs` 375 · `sm` 640 · `md` 768 (tablet) · `lg` 1024 · `xl` 1280 · `2xl` 1536

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
5. Abrir https://lumtek.es con recarga forzada.
