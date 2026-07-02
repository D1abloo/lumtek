import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { defaultPageSeo, staticRouteSeo } from '../../config/siteSeo'
import { applyPageSeo } from '../../hooks/usePageSeo'

/** Meta tags por ruta estática (las fichas /aplicaciones/:slug las gestiona UseCasePage). */
export const RouteSeo = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.startsWith('/aplicaciones/')) return

    const seo = staticRouteSeo[pathname] ?? defaultPageSeo
    applyPageSeo({
      title: seo.title,
      description: seo.description,
      path: pathname,
      noindex: seo.noindex,
      includeSiteGraph: pathname === '/',
    })
  }, [pathname])

  return null
}
