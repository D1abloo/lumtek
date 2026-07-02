# Migración a lumtek.es — checklist de lanzamiento

Guía para pasar de `lumtek.31.70.109.174.nip.io` a **https://lumtek.es** (dominio en GoDaddy, DNS en Cloudflare, VPS en `31.70.109.174`).

El repositorio ya está preparado con `lumtek.es` como URL canónica por defecto. Al lanzar solo hay que configurar DNS, Nginx, SSL y desplegar.

---

## 1. Cloudflare (DNS)

En el panel de Cloudflare, zona `lumtek.es`:

| Tipo | Nombre | Contenido | Proxy |
|------|--------|-----------|-------|
| A | `@` | `31.70.109.174` | Proxied (nube naranja) recomendado |
| A | `www` | `31.70.109.174` | Proxied |

En GoDaddy, los nameservers deben apuntar a Cloudflare (no uses el DNS de GoDaddy si Cloudflare gestiona la zona).

Comprueba propagación:

```bash
dig +short lumtek.es A
dig +short www.lumtek.es A
```

Ambos deben resolver a `31.70.109.174` (o a IPs de Cloudflare si el proxy está activo; el origen sigue siendo la VPS).

---

## 2. Cloudflare SSL

Recomendado: **Full (strict)**

1. Cloudflare → SSL/TLS → Overview → **Full (strict)**
2. En el servidor, Nginx debe tener certificado válido (Let's Encrypt con Certbot en el paso 3).

Si usas proxy de Cloudflare, el certificado de origen lo emite Certbot en la VPS; Cloudflare termina TLS hacia el visitante.

---

## 3. Nginx en la VPS

```bash
ssh root@31.70.109.174
```

Copia la plantilla actualizada (desde tu PC, tras pull del repo):

```bash
scp lumtek-web/deploy/nginx-lumtek.conf root@31.70.109.174:/etc/nginx/sites-available/lumtek
```

En el servidor:

```bash
# Edita server_name si hace falta: lumtek.es www.lumtek.es
nginx -t && systemctl reload nginx

certbot --nginx -d lumtek.es -d www.lumtek.es
```

Certbot añadirá el bloque `listen 443 ssl` y la redirección HTTP → HTTPS.

**Opcional:** redirigir el dominio nip.io antiguo a lumtek.es:

```bash
scp lumtek-web/deploy/nginx-redirect-nip.conf.example root@31.70.109.174:/etc/nginx/sites-available/lumtek-redirect-nip
ln -sf /etc/nginx/sites-available/lumtek-redirect-nip /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## 4. API — CORS y URL del sitio

En `/var/www/lumtek-app/.env`:

```env
CORS_ORIGIN=https://lumtek.es
SITE_URL=https://lumtek.es
```

Reinicia la API:

```bash
systemctl restart lumtek-api
```

Plantilla de referencia: `lumtek-web/deploy/env.production.template`

---

## 5. Deploy desde tu PC

```bash
cd lumtek-web

# Opción A: variables en línea
export LUMTEK_DOMAIN=lumtek.es
export VITE_SITE_URL=https://lumtek.es
bash deploy/deploy-all.sh

# Opción B: archivo deploy.env (no commitear)
cp deploy/deploy.env.example deploy/deploy.env
# edita deploy.env si hace falta
set -a && source deploy/deploy.env && set +a
bash deploy/deploy-all.sh
```

Eso compila el front con la URL correcta (canonical, Open Graph, JSON-LD) y sube front + API.

---

## 6. Verificación post-lanzamiento

```bash
curl -sI https://lumtek.es/ | head -5
curl -s https://lumtek.es/robots.txt
curl -s https://lumtek.es/sitemap.xml | head -20
curl -s https://lumtek.es/api/health
```

En el navegador:

- https://lumtek.es carga sin avisos de certificado
- https://www.lumtek.es redirige o sirve igual (según nginx)
- Formulario de contacto envía correo (requiere `SMTP_PASS` en el servidor)
- Inspeccionar `<link rel="canonical">` y meta `og:url` → deben ser `https://lumtek.es/...`

Google Search Console: añadir propiedad `https://lumtek.es`, enviar sitemap `https://lumtek.es/sitemap.xml`.

---

## 7. Qué ya está en el repo (no hace falta tocarlo al lanzar)

| Archivo | URL por defecto |
|---------|-----------------|
| `src/config/siteSeo.ts` | `https://lumtek.es` |
| `index.html` | meta y JSON-LD con lumtek.es |
| `public/robots.txt`, `public/sitemap.xml` | lumtek.es |
| `server/contactEmail.mjs` | enlaces con `SITE_URL` |
| `deploy/nginx-lumtek.conf` | `server_name lumtek.es www.lumtek.es` |
| `deploy/deploy.env.example` | `LUMTEK_DOMAIN`, `VITE_SITE_URL` |

---

## Resumen en un comando (tras DNS + nginx + certbot en VPS)

```bash
cd lumtek-web && \
  export LUMTEK_DOMAIN=lumtek.es VITE_SITE_URL=https://lumtek.es && \
  bash deploy/deploy-all.sh
```

Luego en la VPS: `CORS_ORIGIN` + `SITE_URL` en `.env` de la API y `systemctl restart lumtek-api`.

---

**Producción objetivo:** https://lumtek.es  
**Legacy (redirect opcional):** https://lumtek.31.70.109.174.nip.io  
**SSH:** `ssh root@31.70.109.174`
