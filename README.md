# Lumtek

Repositorio del sitio web corporativo de **Lumtek** (domótica, sistemas inteligentes y seguridad).

## Contenido

| Carpeta / doc | Descripción |
|---------------|-------------|
| [`lumtek-web/`](lumtek-web/) | Aplicación React + Vite (front y API de contacto) |
| [`docs/VPS.md`](docs/VPS.md) | Montaje completo en VPS: dominio nip.io, Nginx y SSL gratuito |
| [`lumtek-web/deploy/nginx-lumtek.conf`](lumtek-web/deploy/nginx-lumtek.conf) | Plantilla del virtual host Nginx |

## Producción

- **URL:** https://lumtek.31.70.109.174.nip.io  
- **Servidor:** `root@31.70.109.174`  
- **Archivos web:** `/var/www/lumtek`

## Desarrollo rápido

```bash
cd lumtek-web
npm install
npm run dev
```

## Desplegar cambios

```bash
cd lumtek-web
bash deploy/deploy.sh
```

### VPS nueva (montaje + deploy en un paso)

```bash
cd lumtek-web
export LUMTEK_VPS_IP=203.0.113.10
export LUMTEK_CERTBOT_EMAIL=admin@ejemplo.com
bash deploy/setup-and-deploy.sh
```

Detalle paso a paso (manual, SSL, renovación): [`docs/VPS.md`](docs/VPS.md).
