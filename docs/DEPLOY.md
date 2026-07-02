# Subir cambios al servidor (VPS)

Guía rápida para desplegar el sitio Lumtek en producción después de modificar el código en local.

**URL en vivo:** https://lumtek.es (legacy nip.io: https://lumtek.31.70.109.174.nip.io)  
**SSH:** `ssh root@31.70.109.174`

---

## Qué se sube y dónde queda

| Qué cambiaste | Script | Destino en el servidor |
|---------------|--------|-------------------------|
| React, estilos, imágenes `public/`, PWA | `deploy.sh` | `/var/www/lumtek` |
| API de contacto, correos SMTP | `deploy-api.sh` | `/var/www/lumtek-app` |
| **Todo** (lo habitual tras cambios de web) | `deploy-all.sh` | ambas rutas |

El front se **compila en tu máquina** (`npm run build`) y se copia el contenido de `dist/` con `scp`.  
La API se copia como código fuente y en el servidor se ejecuta `npm ci` y se reinicia `lumtek-api`.

---

## Requisitos en tu PC

1. Código del repo en `/home/isaac/Escritorio/lumtek` (o tu ruta local).
2. **Node.js** y **npm** instalados (para el build).
3. **SSH** al VPS sin contraseña (clave pública en el servidor):

   ```bash
   ssh root@31.70.109.174
   ```

4. Opcional: variables en `lumtek-web/deploy/deploy.env` (no se sube a git):

   ```bash
   cp lumtek-web/deploy/deploy.env.example lumtek-web/deploy/deploy.env
   # Edita IP, usuario, email Certbot, etc.
   set -a && source lumtek-web/deploy/deploy.env && set +a
   ```

---

## Despliegue habitual (cambios de la web)

Desde la raíz del monorepo o desde `lumtek-web`:

```bash
cd lumtek-web
bash deploy/deploy-all.sh
```

Equivale a:

```bash
bash deploy/deploy.sh        # build + sube dist/ → /var/www/lumtek
bash deploy/deploy-api.sh    # sube server/ → /var/www/lumtek-app y reinicia API
```

Solo front (sin tocar la API):

```bash
bash deploy/deploy.sh
```

Solo API / plantillas de correo:

```bash
bash deploy/deploy-api.sh
```

### Qué hace `deploy.sh` por dentro

1. `npm ci` en `lumtek-web/`
2. `npm run build` → genera `lumtek-web/dist/`
3. `scp -r dist/. root@31.70.109.174:/var/www/lumtek/`
4. Ajusta permisos `www-data` en el servidor

Nginx sirve esa carpeta; **no hace falta reiniciar Nginx** tras un deploy solo de estáticos.

---

## Primera vez en un VPS nuevo

```bash
cd lumtek-web
export LUMTEK_VPS_IP=31.70.109.174
export LUMTEK_CERTBOT_EMAIL=tu@email.com
bash deploy/setup-and-deploy.sh
```

Instala Nginx, Certbot, SSL nip.io y despliega el build.  
Detalle completo: [`VPS.md`](VPS.md).

---

## Comprobar que ha ido bien

```bash
# Sitio (debe devolver 200)
curl -sI https://lumtek.31.70.109.174.nip.io | head -1

# API
curl -s https://lumtek.31.70.109.174.nip.io/api/health
```

En el navegador: forzar recarga (`Ctrl+Shift+R`) o borrar caché del PWA si no ves cambios.

---

## SMTP (correo de contacto)

La contraseña **no** va en el repo. En el servidor:

```bash
ssh root@31.70.109.174
nano /var/www/lumtek-app/.env   # SMTP_PASS=...
systemctl restart lumtek-api
```

Para sincronizar `SMTP_PASS` desde tu `lumtek-web/.env` local al desplegar:

```bash
export LUMTEK_SMTP_PASS='tu_contraseña'
bash deploy/deploy-api.sh
```

---

## Mapa del repo

| Archivo | Uso |
|---------|-----|
| `lumtek-web/deploy/deploy-all.sh` | Front + API |
| `lumtek-web/deploy/deploy.sh` | Solo front |
| `lumtek-web/deploy/deploy-api.sh` | Solo API |
| `lumtek-web/deploy/setup-and-deploy.sh` | VPS nueva o `--deploy-only` |
| `docs/VPS.md` | Infraestructura y Nginx |
| `docs/INFRAESTRUCTURA.md` | Mapa de archivos y rutas |

---

## Resumen en una línea

```bash
cd lumtek-web && bash deploy/deploy-all.sh
```

Eso compila, sube los archivos al VPS y deja el sitio actualizado en https://lumtek.es

> Checklist completo de migración de dominio: [`DOMINIO-LUMTEK-ES.md`](DOMINIO-LUMTEK-ES.md)
