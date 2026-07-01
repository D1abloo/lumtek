export const registerPwa = () => {
  if (!('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // ponytail: SW opcional; la web funciona sin él
    })
  })
}
