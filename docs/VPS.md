# Despliegue en VPS — Lumtek

Guía de cómo está montado el entorno de producción: servidor Ubuntu, dominio gratuito con **nip.io**, **Nginx** como servidor web y **SSL gratuito** con **Let's Encrypt** (Certbot).

## Resumen

| Concepto | Valor |
|----------|--------|
| **URL** | https://lumtek.31.70.109.174.nip.io |
| **IP del VPS** | `31.70.109.174` |
| **SSH** | `ssh root@31.70.109.174` |
| **SO** | Ubuntu (servidor dedicado/VPS) |
| **Web root** | `/var/www/lumtek` |
| **Servidor HTTP** | Nginx |
| **SSL** | Let's Encrypt (Certbot), renovación automática |
| **Dominio** | Subdominio nip.io (sin registrar dominio de pago) |
| **Tipo de deploy** | Sitio estático (carpeta `dist/` de Vite) |

---

## 1. Dominio gratuito con nip.io

[nip.io](https://nip.io) resuelve DNS de forma que cualquier hostname que **contenga la IP** apunta a esa IP.

Para la IP `31.70.109.174` usamos:

```text
lumtek.31.70.109.174.nip.io  →  31.70.109.174
```

No hace falta comprar dominio ni configurar DNS en un registrador: basta con que el nombre siga el patrón `algo.IP.nip.io`.

> **Nota:** nip.io es útil para pruebas y demos. Para marca profesional conviene un dominio propio (`lumtek.es`) apuntando con un registro A a la misma IP.

---

## 2. Preparar el VPS (primera vez)

Conectar por SSH:

```bash
ssh root@31.70.109.174
```

Actualizar e instalar Nginx y Certbot:

```bash
apt update && apt upgrade -y
apt install -y nginx certbot python3-certbot-nginx ufw
```

Firewall (HTTP + HTTPS + SSH):

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

Crear directorio del sitio:

```bash
mkdir -p /var/www/lumtek
chown -R www-data:www-data /var/www/lumtek
```

---

## 3. Subir el build estático

En tu máquina local, dentro de `lumtek-web`:

```bash
npm install
npm run build
scp -r dist/. root@31.70.109.174:/var/www/lumtek/
ssh root@31.70.109.174 "chown -R www-data:www-data /var/www/lumtek"
```

El contenido de `dist/` (incluye `index.html`, `assets/`, `images/`, PWA, etc.) queda servido tal cual.

---

## 4. Configurar Nginx

Copiar la plantilla del repo al servidor:

```bash
# En el VPS, crear el site:
nano /etc/nginx/sites-available/lumtek
```

Pegar el contenido de [`lumtek-web/deploy/nginx-lumtek.conf`](../lumtek-web/deploy/nginx-lumtek.conf) o equivalente:

- `server_name lumtek.31.70.109.174.nip.io`
- `root /var/www/lumtek`
- SPA: `try_files $uri $uri/ /index.html`
- Caché de assets estáticos (~7 días)

Activar el sitio y quitar el default si molesta:

```bash
ln -sf /etc/nginx/sites-available/lumtek /etc/nginx/sites-enabled/lumtek
rm -f /etc/nginx/sites-enabled/default   # opcional
nginx -t && systemctl reload nginx
```

Comprobar HTTP (antes de SSL):

```bash
curl -sI http://lumtek.31.70.109.174.nip.io/ | head -5
```

---

## 5. SSL gratuito con Let's Encrypt (Certbot)

Con Nginx ya sirviendo el sitio en el puerto 80:

```bash
certbot --nginx -d lumtek.31.70.109.174.nip.io
```

Certbot:

1. Valida que el dominio resuelve a este servidor.
2. Obtiene el certificado gratuito de Let's Encrypt.
3. Modifica (o crea) el bloque `listen 443 ssl` en el site de Nginx.
4. Configura redirección HTTP → HTTPS.

Comprobar HTTPS:

```bash
curl -sI https://lumtek.31.70.109.174.nip.io/ | head -5
```

### Renovación automática

Certbot instala un timer systemd. Probar:

```bash
certbot renew --dry-run
```

Los certificados se renuevan solos antes de caducar (cada ~90 días).

---

## 6. Desplegar actualizaciones (día a día)

Cada vez que cambies el front:

```bash
cd lumtek-web
npm run build
scp -r dist/. root@31.70.109.174:/var/www/lumtek/
ssh root@31.70.109.174 "chown -R www-data:www-data /var/www/lumtek"
```

En el navegador: recarga forzada (`Ctrl+Shift+R`) por la caché de JS/CSS.

Verificar:

```bash
curl -sI https://lumtek.31.70.109.174.nip.io/ | head -3
```

---

## 7. API de contacto (opcional, no desplegada aún)

El formulario usa `/api/contact` (`lumtek-web/server/index.mjs`). El deploy actual es **solo estático**; el correo no se envía en producción hasta que:

1. Se ejecute el servidor Node en el VPS (p. ej. puerto `3001` con systemd).
2. Nginx haga proxy de `/api` → `http://127.0.0.1:3001`.
3. Se configure `.env` con `SMTP_PASS`, `MAIL_TO`, etc.

Ver [`lumtek-web/README.md`](../lumtek-web/README.md) sección API de contacto.

---

## 8. Estructura en el servidor

```text
/var/www/lumtek/          # Build Vite (dist/)
/etc/nginx/sites-available/lumtek
/etc/nginx/sites-enabled/lumtek → ../sites-available/lumtek
/etc/letsencrypt/live/lumtek.31.70.109.174.nip.io/
  fullchain.pem
  privkey.pem
```

---

## 9. Solución de problemas

| Síntoma | Qué revisar |
|---------|-------------|
| 502 / no carga | `systemctl status nginx`, `nginx -t` |
| Certificado inválido | `certbot certificates`, renovar con `certbot renew` |
| Cambios no se ven | Caché del navegador; cabeceras `Cache-Control` en Nginx |
| 404 en rutas `/contacto` | Falta `try_files ... /index.html` (SPA) |
| Dominio no resuelve | Comprobar que usas `lumtek.31.70.109.174.nip.io` (IP correcta en el nombre) |

---

## Diagrama del flujo

```text
Usuario
   │
   ▼
DNS nip.io  (lumtek.31.70.109.174.nip.io → 31.70.109.174)
   │
   ▼
Nginx :443 (TLS Let's Encrypt)
   │
   ├─ /          → /var/www/lumtek/index.html + SPA
   ├─ /assets/*  → archivos con caché
   └─ /api/*     → (pendiente) proxy a Node :3001
```
