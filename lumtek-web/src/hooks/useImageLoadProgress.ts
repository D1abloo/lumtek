import { useCallback, useEffect, useState } from 'react'

const MIN_OVERLAY_MS = 1_350

/** Progreso simulado hasta ~92 %; al cargar la imagen salta a 100 % */
export const useImageLoadProgress = (imageKey: string, loaded: boolean) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    if (loaded) return

    let raf = 0
    const start = performance.now()
    const duration = 2_800

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 2.1
      setProgress(Math.min(92, Math.round(eased * 92)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [imageKey, loaded])

  useEffect(() => {
    if (!loaded) return
    setProgress(100)
  }, [loaded])

  return progress
}

type UsePhoneImageLoadResult = {
  loaded: boolean
  visible: boolean
  progress: number
  handleLoad: () => void
  handleError: () => void
}

/** Mantiene el overlay visible al menos MIN_OVERLAY_MS aunque la imagen esté en caché */
export const usePhoneImageLoad = (imageKey: string): UsePhoneImageLoadResult => {
  const [loaded, setLoaded] = useState(false)
  const [minElapsed, setMinElapsed] = useState(false)
  const progress = useImageLoadProgress(imageKey, loaded)
  const visible = !loaded || !minElapsed

  useEffect(() => {
    setLoaded(false)
    setMinElapsed(false)
    const timer = window.setTimeout(() => setMinElapsed(true), MIN_OVERLAY_MS)
    return () => window.clearTimeout(timer)
  }, [imageKey])

  const handleLoad = useCallback(() => setLoaded(true), [])
  const handleError = useCallback(() => setLoaded(true), [])

  return { loaded, visible, progress, handleLoad, handleError }
}