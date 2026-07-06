import { useEffect } from 'react'
import {
  DEFAULT_OG_IMAGE,
  SITE_URL,
  defaultPageSeo,
  organizationJsonLd,
  websiteJsonLd,
} from '../config/siteSeo'

const JSON_LD_ID = 'lumtek-page-jsonld'

export type PageSeoConfig = {
  title: string
  description: string
  path?: string
  image?: string
  imageAlt?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  includeSiteGraph?: boolean
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setCanonical = (href: string) => {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

const setJsonLd = (data: Record<string, unknown> | Record<string, unknown>[]) => {
  let el = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = JSON_LD_ID
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export const applyPageSeo = ({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  imageAlt = 'Lumtek — domótica y sistemas inteligentes',
  noindex = false,
  jsonLd,
  includeSiteGraph = false,
}: PageSeoConfig) => {
  const url = `${SITE_URL}${path}`

  document.title = title
  setMeta('name', 'description', description)
  setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
  setCanonical(url)

  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:site_name', 'Lumtek')
  setMeta('property', 'og:locale', 'es_ES')
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:url', url)
  setMeta('property', 'og:image', image)
  setMeta('property', 'og:image:alt', imageAlt)

  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', description)
  setMeta('name', 'twitter:image', image)
  setMeta('name', 'twitter:image:alt', imageAlt)

  if (jsonLd) {
    setJsonLd(jsonLd)
  } else if (includeSiteGraph) {
    setJsonLd([organizationJsonLd, websiteJsonLd])
  }
}

export const usePageSeo = (config: PageSeoConfig | null) => {
  useEffect(() => {
    if (!config) return

    applyPageSeo(config)

    return () => {
      applyPageSeo({
        ...defaultPageSeo,
        path: '/',
        includeSiteGraph: true,
      })
    }
  }, [config])
}
