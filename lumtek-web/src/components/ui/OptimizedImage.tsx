import { useState } from 'react'

type OptimizedImageProps = {
  src: string
  fallbackSrc?: string
  alt: string
  className?: string
  wrapperClassName?: string
  priority?: boolean
  sizes?: string
}

export const OptimizedImage = ({
  src,
  fallbackSrc,
  alt,
  className = 'h-full w-full object-cover',
  wrapperClassName = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 40vw',
}: OptimizedImageProps) => {
  const [source, setSource] = useState(src)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (fallbackSrc && source !== fallbackSrc) {
      setSource(fallbackSrc)
      setLoaded(false)
      return
    }
    setFailed(true)
  }

  if (failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-lumtek-blue/10 via-white to-lumtek-cyan/10 ${wrapperClassName}`}
        role="img"
        aria-label={alt}
      />
    )
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${wrapperClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-lumtek-muted" aria-hidden />
      )}
      <img
        src={source}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={handleError}
      />
    </div>
  )
}
