# Infraestructura Lumtek — mapa completo

Guía de referencia para **modificar manualmente** cualquier parte del sitio: código fuente, datos, assets, API, correos y servidor de producción.

**Producción:** https://lumtek.es  
**SSH:** `ssh root@31.70.109.174`

Documentación relacionada: [`DOMINIO-LUMTEK-ES.md`](DOMINIO-LUMTEK-ES.md) (lanzar lumtek.es) · [`DEPLOY.md`](DEPLOY.md) (subir cambios al servidor) · [`SEO.md`](SEO.md) (metadatos y sitemap) · [`VPS.md`](VPS.md) (montaje servidor) · [`../lumtek-web/README.md`](../lumtek-web/README.md) (app web) · [`../README.md`](../README.md) (índice repo)

---

## 1. Arquitectura general

```text
Usuario
   │
   ▼
DNS Cloudflare  (lumtek.es / www → 31.70.109.174)
   │
   ▼
Nginx :443 (SSL Let's Encrypt)
   │
   ├─ /              → /var/www/lumtek/          (build React estático)
   ├─ /assets/*      → JS/CSS con caché
   └─ /api/*         → lumtek-api (Node :3001)    → SMTP GoDaddy
```

| Capa | Tecnología | Carpeta repo |
|------|------------|--------------|
| Frontend | React 19 + Vite + Tailwind + Framer Motion | `lumtek-web/src/` |
| API contacto | Node + Express + Nodemailer | `lumtek-web/server/` |
| Estáticos / PWA | `public/` | `lumtek-web/public/` |
| Deploy | Bash scripts | `lumtek-web/deploy/` |

---

## 2. Servidor VPS — rutas en producción

| Qué modificar | Ruta en el servidor |
|---------------|---------------------|
| **Sitio web** (HTML, JS, CSS, imágenes del build) | `/var/www/lumtek` |
| **API de contacto** | `/var/www/lumtek-app` |
| **Contraseña SMTP / correo** | `/var/www/lumtek-app/.env` |
| **Plantillas de correo** (tras deploy desde repo) | `/var/www/lumtek-app/server/contactEmail.mjs` |
| **Lógica API** | `/var/www/lumtek-app/server/index.mjs` |
| **Nginx** (SSL, SPA, proxy `/api`) | `/etc/nginx/sites-available/lumtek` |
| **Certificados SSL** | `/etc/letsencrypt/live/lumtek.es/` |
| **Servicio systemd API** | `/etc/systemd/system/lumtek-api.service` |

### Comandos habituales en el servidor

```bash
# Estado API
systemctl status lumtek-api
journalctl -u lumtek-api -f

# Tras cambiar SMTP
nano /var/www/lumtek-app/.env
systemctl restart lumtek-api
curl -s https://lumtek.es/api/health

# Tras cambiar Nginx
nginx -t && systemctl reload nginx
```

### Desplegar desde tu máquina

```bash
cd lumtek-web
bash deploy/deploy-all.sh      # front + API
bash deploy/deploy.sh          # solo web estática
bash deploy/deploy-api.sh      # solo API / correos
```

---

## 3. Estructura del repositorio

```text
lumtek/
├── README.md                          # Índice general
├── docs/
│   ├── INFRAESTRUCTURA.md             # ← este archivo
│   └── VPS.md                         # Montaje VPS, SSL, nip.io
└── lumtek-web/
    ├── index.html                     # Meta SEO, favicon, manifest
    ├── public/                        # Assets estáticos (no pasan por Vite)
    ├── src/                           # Código React
    ├── server/                        # API Node + plantillas correo
    └── deploy/                        # Scripts de despliegue
```

---

## 4. Layout global (todas las páginas)

Estos componentes envuelven **cada ruta** de la app.

| Qué | Archivo repo | Qué editar |
|-----|--------------|------------|
| **App raíz** (rutas, cookies, header/footer) | `lumtek-web/src/App.tsx` | Rutas, banner cookies, modal cookies |
| **Header** (menú superior, móvil, botón Contactar) | `lumtek-web/src/components/layout/Header.tsx` | Comportamiento menú, scroll, botón CTA |
| **Logo + wordmark del header** | `lumtek-web/src/components/layout/HeaderBrand.tsx` | Tamaños logo/texto header vs footer |
| **Ruta imagen logo** | `lumtek-web/src/components/layout/HeaderLogo.tsx` | `LUMTEK_BRAND_LOGO_SRC` → `/images/brand/lumtek-logo.webp` |
| **Wordmark animado LUMTEK** | `lumtek-web/src/components/ui/LumtekLogo.tsx` | Tipografía, rayos, variantes |
| **Footer** (pie de página) | `lumtek-web/src/components/layout/Footer.tsx` | Columnas enlaces, contacto, copyright |
| **Items menú navegación** | `lumtek-web/src/data/siteContent.ts` → `navItems` | Enlaces del header |
| **Enlaces footer** | `lumtek-web/src/components/layout/Footer.tsx` → `footerNav`, `legalLinks` | Nav y legal del pie |
| **Barra progreso scroll** | `lumtek-web/src/components/ui/ScrollProgress.tsx` | Barra superior al hacer scroll |
| **Fondo ambiental** | `lumtek-web/src/components/ui/AmbientBackground.tsx` | Fondo global de la app |

### Datos de marca y contacto (header/footer/formulario)

| Dato | Archivo |
|------|---------|
| Teléfono, email, ubicación, claim, textos hero | `lumtek-web/src/data/siteContent.ts` |
| Email actual | `siteContent.contact.email` → `juanf.delgado@lumtek.es` |

---

## 5. Página de inicio (`/`)

Orden de secciones definido en **`lumtek-web/src/pages/HomePage.tsx`**.

| Orden | Sección visible | Componente | Datos / notas |
|-------|-----------------|------------|---------------|
| 1 | **Hero** (titular + móvil demo) | `src/components/hero/Hero.tsx` | Textos en `siteContent.hero` |
| 2 | Franja beneficios | `src/components/sections/BenefitsStrip.tsx` | `src/data/useCases.ts` → `benefits` |
| 3 | Control / app móvil | `src/components/sections/ControlFeaturesSection.tsx` | `src/data/controlFeatures.ts` |
| 4 | Domótica (`#domotica`) | `src/components/sections/DomoticsSection.tsx` | `src/data/domoticHotspots.ts` |
| 5 | Cámaras / seguridad (`#camaras`, `#seguridad`) | `src/components/sections/SecuritySection.tsx` | `src/data/cameras.ts` |
| 6 | Core / nodos | `src/components/sections/CoreSection.tsx` | `src/data/coreNodes.ts` |
| 7 | Servicios (`#servicios`) | `src/components/sections/ServicesSection.tsx` | `src/data/services.ts` |
| 8 | Casos de uso | `src/components/sections/UseCasesSection.tsx` | `src/data/useCases.ts` |
| 9 | Reseñas | `src/components/sections/ReviewsSection.tsx` | `src/data/reviews.ts` |
| 10 | Proceso | `src/components/sections/ProcessSection.tsx` | Texto en el componente |
| 11 | Contacto (bloque) | `src/components/contact/ContactSection.tsx` | Formulario compacto |

### Hero — detalle

| Elemento | Archivo |
|----------|---------|
| Título, subtítulo, highlights, CTAs | `src/components/hero/Hero.tsx` + `siteContent.hero` |
| Fondo visual del hero | `src/components/hero/HeroVisualBackground.tsx` |
| Contenedor del teléfono | `src/components/hero/HeroPhoneShowcase.tsx` |
| Marco del móvil (tamaños responsive) | `src/components/hero/PhoneDemo.tsx` |
| Pantalla bloqueada / cámara en vivo | `src/components/hero/LiveCameraPreview.tsx` |
| App Lumtek Control (menú interno) | `src/components/hero/LumtekControlApp.tsx` |
| Menú secciones (Puertas, Cámaras…) | `src/components/hero/LumtekSectionMenu.tsx` |
| Detalle de cada sección del móvil | `src/components/hero/LumtekSectionDetail.tsx` |
| Hotspots interactivos en imágenes | `src/components/hero/SectionInteractiveImage.tsx` |
| Posiciones hotspots | `src/data/sectionHotspots.ts`, `src/data/domoticHotspots.ts` |
| Lista secciones app móvil | `src/data/appSections.ts` |
| Imágenes del hero | `src/data/heroAssets.ts` + `public/images/hero/` |

---

## 6. Otras páginas

| URL | Archivo página | Layout / datos |
|-----|----------------|----------------|
| `/` | `src/pages/HomePage.tsx` | Ver sección 5 |
| `/contacto` | `src/pages/ContactPage.tsx` | Usa `ContactSection` con formulario completo |
| `/aplicaciones/:slug` | `src/pages/UseCasePage.tsx` | `src/data/useCaseContent.ts`, `useCases.ts` |
| `/aviso-legal` | `src/pages/LegalNoticePage.tsx` | `src/data/legalContent.ts` |
| `/politica-privacidad` | `src/pages/PrivacyPolicyPage.tsx` | `src/data/legalContent.ts` |
| `/politica-cookies` | `src/pages/CookiesPolicyPage.tsx` | `src/data/legalContent.ts` |
| `/configuracion-cookies` | `src/pages/CookieSettingsPage.tsx` | `src/components/cookies/CookieSettingsPanel.tsx` |

Layout común páginas legales: `src/components/legal/LegalLayout.tsx`

---

## 7. Formulario de contacto

| Qué | Archivo repo | VPS (producción) |
|-----|--------------|------------------|
| Formulario (campos, validación, progreso) | `src/components/contact/ContactForm.tsx` | — |
| Sección contacto (layout home / página) | `src/components/contact/ContactSection.tsx` | — |
| Opciones desplegables (tipo proyecto…) | `src/data/contactOptions.ts` | — |
| Cliente HTTP del formulario | `src/services/contactService.ts` | — |
| API Express + SMTP | `server/index.mjs` | `/var/www/lumtek-app/server/index.mjs` |
| **Cuerpo correos** (interno + cliente) | `server/contactEmail.mjs` | `/var/www/lumtek-app/server/contactEmail.mjs` |
| Variables entorno local | `lumtek-web/.env` | — |
| Variables entorno producción | `deploy/env.production.template` | `/var/www/lumtek-app/.env` |

Variables SMTP en `.env`:

```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_USER=juanf.delgado@lumtek.es
SMTP_PASS=...                      # contraseña del buzón GoDaddy
MAIL_TO=juanf.delgado@lumtek.es
MAIL_CLIENT_CONFIRM=true
```

Probar plantillas sin desplegar: `node server/contactEmail.mjs`

---

## 8. Cookies y legal

| Qué | Archivo |
|-----|---------|
| Banner cookies (barra inferior) | `src/components/cookies/CookieBanner.tsx` |
| Modal configuración | `src/components/cookies/CookieSettingsModal.tsx` |
| Panel preferencias | `src/components/cookies/CookieSettingsPanel.tsx` |
| Lógica consentimiento | `src/utils/cookies.ts` |
| Textos legales | `src/data/legalContent.ts` |

---

## 9. PWA (aplicación instalable)

| Qué | Archivo repo | VPS |
|-----|--------------|-----|
| Manifest (nombre, iconos, tema) | `public/manifest.webmanifest` | `/var/www/lumtek/manifest.webmanifest` |
| Service worker (caché) | `public/sw.js` | `/var/www/lumtek/sw.js` |
| Registro SW | `src/registerPwa.ts` | (dentro del bundle JS) |
| Iconos PWA | `public/images/brand/icon-192.png`, `icon-512.png` | `/var/www/lumtek/images/brand/` |
| Meta PWA en HTML | `index.html` | `/var/www/lumtek/index.html` (tras build) |

---

## 10. Estilos, tipografía y responsive

| Qué | Archivo |
|-----|---------|
| Estilos globales, utilidades (`.section-x`, `.page-top`…) | `src/index.css` |
| Colores Lumtek, breakpoints, animaciones | `tailwind.config.js` |
| Fuentes (Google Fonts) | `index.html` |
| Punto de entrada React | `src/main.tsx` |

**Breakpoints Tailwind:** `xs` 375 · `sm` 640 · `md` 768 (tablet) · `lg` 1024 · `xl` 1280 · `2xl` 1536

Probar responsive: Chrome → F12 → icono dispositivo → iPhone / iPad / dimensiones custom.

---

## 11. Imágenes y assets estáticos

| Qué | Ruta repo | URL pública |
|-----|-----------|-------------|
| Imágenes generales | `public/images/` | `/images/...` |
| Logo webp | `public/images/brand/lumtek-logo.webp` | `/images/brand/lumtek-logo.webp` |
| Iconos PWA | `public/images/brand/icon-*.png` | `/images/brand/icon-*.png` |
| Hero / domótica / montaña | `public/images/hero/` | `/images/hero/...` |
| Iconos app móvil | `public/images/app/` | `/images/app/...` |
| Cámaras mockup | `public/images/cameras/` | `/images/cameras/...` |
| Favicon | `public/favicon.ico`, `favicon.svg` | `/favicon.ico` |

> Los archivos en `public/` se copian tal cual al build (`dist/`) y a `/var/www/lumtek` en producción.

---

## 12. SEO y metadatos

| Qué | Archivo |
|-----|---------|
| `<title>`, meta description, Open Graph, JSON-LD | `index.html` |
| Canonical y OG en páginas dinámicas | `src/pages/UseCasePage.tsx` (y similares) |

---

## 13. Scripts de deploy

| Script | Función |
|--------|---------|
| `deploy/deploy-all.sh` | Front + API |
| `deploy/deploy.sh` | Solo build → `/var/www/lumtek` |
| `deploy/deploy-api.sh` | API Node + systemd + merge `.env` |
| `deploy/setup-and-deploy.sh` | VPS nueva (Nginx, SSL, primera subida) |
| `deploy/nginx-site.conf.template` | Plantilla Nginx con proxy `/api` |
| `deploy/lumtek-api.service.example` | Plantilla systemd |
| `deploy/env.production.template` | Plantilla `.env` producción |

Sincronizar contraseña SMTP sin editar a mano en VPS:

```bash
LUMTEK_SMTP_PASS='contraseña' bash deploy/deploy-api.sh
```

---

## 14. Flujo de trabajo recomendado

```text
1. Identificar qué quieres cambiar (tabla de este documento)
2. Editar archivo en lumtek-web/src/ o lumtek-web/public/
3. npm run dev          → previsualizar en :5173
4. npm run build        → comprobar que compila
5. bash deploy/deploy-all.sh   → subir a VPS
6. Ctrl+Shift+R en el navegador (caché)
```

| Si cambias… | Despliega con… |
|-------------|----------------|
| Textos, UI, imágenes, estilos | `deploy/deploy.sh` o `deploy-all.sh` |
| API o plantillas correo | `deploy/deploy-api.sh` |
| Nginx / SSL | Edición manual en VPS (ver `docs/VPS.md`) |
| Solo `.env` SMTP en servidor | `nano /var/www/lumtek-app/.env` + `systemctl restart lumtek-api` |

---

## 15. Índice rápido «quiero cambiar X»

| Quiero cambiar… | Archivo |
|-----------------|---------|
| Menú del header | `src/data/siteContent.ts` → `navItems` |
| Logo / marca header | `HeaderBrand.tsx`, `HeaderLogo.tsx`, `public/images/brand/` |
| Pie de página | `Footer.tsx` |
| Título principal home | `siteContent.ts` → `hero` + `Hero.tsx` |
| Teléfono o email visible | `siteContent.ts` → `contact` |
| Orden secciones home | `HomePage.tsx` |
| Servicios | `data/services.ts` + `ServicesSection.tsx` |
| Formulario contacto | `ContactForm.tsx` |
| Textos correo automático | `server/contactEmail.mjs` |
| Cookies / RGPD | `legalContent.ts`, `CookieBanner.tsx` |
| Colores / fuentes | `tailwind.config.js`, `index.css` |
