# SEO — Lumtek

Configuración técnica y on-page del sitio.

**Producción:** https://lumtek.es

---

## Archivos clave

| Qué | Dónde |
|-----|--------|
| URL base, textos por ruta, JSON-LD | `lumtek-web/src/config/siteSeo.ts` |
| Aplicar title, description, canonical, OG | `lumtek-web/src/hooks/usePageSeo.ts` |
| Meta en rutas estáticas | `lumtek-web/src/components/seo/RouteSeo.tsx` |
| Meta en fichas `/aplicaciones/:slug` | `lumtek-web/src/pages/UseCasePage.tsx` |
| HTML inicial (crawlers sin JS) | `lumtek-web/index.html` |
| `robots.txt` | `lumtek-web/public/robots.txt` |
| Sitemap | `lumtek-web/public/sitemap.xml` |

---

## Cambiar dominio (p. ej. lumtek.es)

1. Define `VITE_SITE_URL=https://tudominio.es` en `.env` antes del build.
2. Actualiza `public/robots.txt` y `public/sitemap.xml` (URLs absolutas).
3. Vuelve a desplegar: `bash deploy/deploy-all.sh`.

---

## Añadir una página nueva

1. Añade la ruta en `App.tsx`.
2. Registra title y description en `staticRouteSeo` (`siteSeo.ts`).
3. Incluye la URL en `sitemapPaths` / `public/sitemap.xml`.
4. Si no debe indexarse (p. ej. utilidad interna), usa `noindex: true`.

---

## Comprobaciones

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- Lighthouse → pestaña SEO
- `curl -s https://lumtek.es/robots.txt`
- `curl -s https://lumtek.es/sitemap.xml`

Tras el despliegue, envía el sitemap en [Google Search Console](https://search.google.com/search-console).
