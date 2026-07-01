# Lumtek

Repositorio del sitio web corporativo de **Lumtek** (domótica, sistemas inteligentes y seguridad).

**Producción:** https://lumtek.31.70.109.174.nip.io  
**Servidor:** `ssh root@31.70.109.174`

---

## Mapa completo en la VPS (cambios manuales)

| Qué | Ruta en el servidor |
|-----|---------------------|
| **Web estática** (HTML, JS, CSS, imágenes del build) | `/var/www/lumtek` |
| **API de contacto** (Node + SMTP) | `/var/www/lumtek-app` |
| **Variables SMTP** (solo falta `SMTP_PASS`) | `/var/www/lumtek-app/.env` |
| **Plantillas de correo** | `/var/www/lumtek-app/server/contactEmail.mjs` |
| **Servidor Express** | `/var/www/lumtek-app/server/index.mjs` |
| **Nginx** (SSL + proxy `/api`) | `/etc/nginx/sites-available/lumtek` |
| **Certificados SSL** | `/etc/letsencrypt/live/lumtek.31.70.109.174.nip.io/` |
| **Servicio API** (systemd) | `/etc/systemd/system/lumtek-api.service` |

### Comandos útiles en el servidor

```bash
# Ver estado de la API
systemctl status lumtek-api
journalctl -u lumtek-api -f

# Tras editar .env (contraseña SMTP)
nano /var/www/lumtek-app/.env
systemctl restart lumtek-api
curl https://lumtek.31.70.109.174.nip.io/api/health

# Tras editar Nginx
nginx -t && systemctl reload nginx
```

---

## Mapa en el repositorio (código fuente)

| Qué | Archivo / carpeta |
|-----|-------------------|
| App React + Vite | [`lumtek-web/`](lumtek-web/) |
| Formulario contacto | `lumtek-web/src/components/contact/ContactForm.tsx` |
| API + envío SMTP | `lumtek-web/server/index.mjs` |
| **Cuerpo de correos** (interno + cliente) | `lumtek-web/server/contactEmail.mjs` |
| Deploy front | `lumtek-web/deploy/deploy.sh` |
| Deploy API | `lumtek-web/deploy/deploy-api.sh` |
| Deploy todo | `lumtek-web/deploy/deploy-all.sh` |
| `.env` local (desarrollo) | `lumtek-web/.env` (copiar de `.env.example`) |
| `.env` producción (plantilla) | `lumtek-web/deploy/env.production.template` |
| Guía VPS detallada | [`docs/VPS.md`](docs/VPS.md) |
| **Mapa infraestructura** (header, hero, footer, todo) | [`docs/INFRAESTRUCTURA.md`](docs/INFRAESTRUCTURA.md) |
| Nginx plantilla | `lumtek-web/deploy/nginx-site.conf.template` |

---

## Desarrollo local

```bash
cd lumtek-web
npm install
cp .env.example .env    # rellena SMTP_PASS para probar envíos
npm run dev             # front → :5173
npm run dev:api         # API → :3001 (otra terminal)
```

Probar plantillas de correo:

```bash
node server/contactEmail.mjs
```

---

## Desplegar en la VPS

Desde tu máquina:

```bash
cd lumtek-web
bash deploy/deploy-all.sh
```

Solo front o solo API:

```bash
bash deploy/deploy.sh      # estático → /var/www/lumtek
bash deploy/deploy-api.sh  # Node → /var/www/lumtek-app
```

### Primera vez / VPS nueva

```bash
export LUMTEK_VPS_IP=31.70.109.174
export LUMTEK_CERTBOT_EMAIL=admin@ejemplo.com
bash deploy/setup-and-deploy.sh
bash deploy/deploy-api.sh
```

### Activar correo (GoDaddy)

En el servidor, edita `/var/www/lumtek-app/.env`:

```env
SMTP_USER=juanf.delgado@lumtek.es
SMTP_PASS=tu-contraseña-del-buzón
MAIL_TO=juanf.delgado@lumtek.es
```

```bash
systemctl restart lumtek-api
```

Al enviar el formulario se mandan **dos correos**:
1. **Interno** a `MAIL_TO` con todos los datos del cliente.
2. **Confirmación al cliente** con resumen y mensaje de agradecimiento.

Para desactivar el correo al cliente: `MAIL_CLIENT_CONFIRM=false` en `.env`.

---

## Editar el cuerpo de los correos

Modifica `lumtek-web/server/contactEmail.mjs`:

- `buildStaffEmail()` — correo que recibe Lumtek.
- `buildClientEmail()` — confirmación automática al cliente.

Tras cambiar, redespliega la API:

```bash
bash deploy/deploy-api.sh
```

---

## Estado del proyecto

**Versión entregada:** sitio responsive (móvil, tablet, escritorio), PWA instalable con guía en el footer, formulario de contacto con correos automáticos (staff + cliente), desplegado en VPS.

**Producción:** https://lumtek.31.70.109.174.nip.io

---

Documentación ampliada: [`docs/INFRAESTRUCTURA.md`](docs/INFRAESTRUCTURA.md) · [`docs/VPS.md`](docs/VPS.md) · [`lumtek-web/README.md`](lumtek-web/README.md)
