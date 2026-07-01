import { Download, Share, Smartphone } from 'lucide-react'
import { usePwaInstall } from '../../hooks/usePwaInstall'

const LOGO_SRC = '/images/brand/icon-192.png'

const steps = {
  ios: [
    'Abre esta web en Safari.',
    'Pulsa el botón Compartir (cuadrado con flecha hacia arriba).',
    'Elige «Añadir a pantalla de inicio».',
    'Confirma con «Añadir». El icono de Lumtek quedará en tu inicio.',
  ],
  android: [
    'Abre esta web en Chrome.',
    'Pulsa el menú ⋮ (arriba a la derecha).',
    'Elige «Instalar aplicación» o «Añadir a pantalla de inicio».',
    'Confirma la instalación.',
  ],
  desktop: [
    'Abre esta web en Google Chrome o Microsoft Edge.',
    'Busca el icono de instalación en la barra de direcciones (⊕ o monitor).',
    'Pulsa «Instalar» para añadir Lumtek como aplicación.',
    'También puedes usar el botón de abajo si aparece disponible.',
  ],
  unknown: [
    'Usa el navegador de tu dispositivo (Chrome, Safari o Edge).',
    'Busca la opción «Instalar» o «Añadir a pantalla de inicio» en el menú del navegador.',
  ],
}

export const PwaInstallGuide = () => {
  const { canInstall, isInstalled, platform, install } = usePwaInstall()
  const guide = steps[platform === 'unknown' ? 'unknown' : platform]

  const handleInstall = async () => {
    await install()
  }

  return (
    <section
      className="rounded-2xl border border-lumtek-border bg-gradient-to-br from-white to-lumtek-surface p-5 sm:p-6 md:p-7"
      aria-labelledby="pwa-install-title"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6 lg:gap-8">
        <div className="flex shrink-0 items-center gap-4 md:flex-col md:items-center md:text-center lg:min-w-[7.5rem]">
          <img
            src={LOGO_SRC}
            alt="Logo Lumtek"
            width={72}
            height={72}
            className="h-14 w-14 rounded-2xl border border-lumtek-border bg-white p-1.5 shadow-soft sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]"
            loading="lazy"
            decoding="async"
          />
          <div className="md:mt-1">
            <p className="font-display text-sm font-semibold text-lumtek-text">App Lumtek</p>
            <p className="text-xs text-lumtek-text-secondary">Acceso rápido sin buscar la URL</p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Smartphone className="h-4 w-4 shrink-0 text-lumtek-blue" aria-hidden />
            <h3
              id="pwa-install-title"
              className="font-display text-sm font-semibold uppercase tracking-wider text-lumtek-text"
            >
              Instalar en tu dispositivo
            </h3>
          </div>

          {isInstalled ? (
            <p className="mt-3 text-sm leading-relaxed text-emerald-700">
              Lumtek ya está instalada en este dispositivo. Ábrela desde tu pantalla de inicio o
              desde el escritorio.
            </p>
          ) : (
            <>
              <ol className="mt-3 space-y-2 text-sm leading-relaxed text-lumtek-text-secondary">
                {guide.map((step, index) => (
                  <li key={step} className="flex gap-2.5">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lumtek-blue/10 text-[11px] font-semibold text-lumtek-blue"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0 pt-px">{step}</span>
                  </li>
                ))}
              </ol>

              {platform === 'ios' && (
                <p className="mt-3 flex items-center gap-2 text-xs text-lumtek-text-secondary">
                  <Share className="h-3.5 w-3.5 shrink-0 text-lumtek-blue" aria-hidden />
                  En iPhone e iPad solo está disponible desde Safari.
                </p>
              )}

              {canInstall && (
                <button
                  type="button"
                  onClick={handleInstall}
                  className="touch-target mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lumtek-blue to-[#0090dd] px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-105 sm:w-auto"
                  aria-label="Instalar aplicación Lumtek"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Instalar Lumtek
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
