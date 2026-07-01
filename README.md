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
npm run build
scp -r dist/. root@31.70.109.174:/var/www/lumtek/
ssh root@31.70.109.174 "chown -R www-data:www-data /var/www/lumtek"
```

Detalle paso a paso (primera instalación, SSL, renovación): [`docs/VPS.md`](docs/VPS.md).
