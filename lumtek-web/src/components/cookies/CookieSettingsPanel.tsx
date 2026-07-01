import type { CookiePreferences } from '../../types'

const categories = [
  {
    key: 'technical' as const,
    title: 'Técnicas',
    description: 'Necesarias para el funcionamiento básico del sitio. Siempre activas.',
    locked: true,
  },
  {
    key: 'analytics' as const,
    title: 'Analíticas',
    description: 'Nos ayudan a entender cómo se utiliza la web de forma anónima.',
    locked: false,
  },
  {
    key: 'preferences' as const,
    title: 'Preferencias',
    description: 'Recuerdan tus ajustes y personalizan la experiencia.',
    locked: false,
  },
  {
    key: 'marketing' as const,
    title: 'Marketing',
    description: 'Permiten mostrar contenido relevante en otros canales.',
    locked: false,
  },
]

type CookieSettingsPanelProps = {
  preferences: CookiePreferences
  onChange: (prefs: CookiePreferences) => void
  onSave: () => void
  onClose?: () => void
  showClose?: boolean
  plain?: boolean
}

export const CookieSettingsPanel = ({
  preferences,
  onChange,
  onSave,
  onClose,
  showClose = true,
  plain = false,
}: CookieSettingsPanelProps) => {
  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'technical') return
    onChange({ ...preferences, [key]: !preferences[key] })
  }

  const itemClass = plain
    ? 'flex items-start justify-between gap-4 border-b border-lumtek-border/40 py-5 last:border-b-0'
    : 'flex items-start justify-between gap-4 rounded-lg border border-lumtek-border bg-lumtek-surface p-4'

  return (
    <div>
      <ul className={plain ? 'divide-y divide-lumtek-border/40' : 'space-y-4'}>
        {categories.map((cat) => (
          <li key={cat.key} className={itemClass}>
            <div>
              <p className="font-display text-sm font-semibold text-lumtek-text">{cat.title}</p>
              <p className="mt-1 text-xs text-lumtek-text-secondary">{cat.description}</p>
            </div>
            {cat.locked ? (
              <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                Activo
              </span>
            ) : (
              <button
                type="button"
                role="switch"
                aria-checked={preferences[cat.key]}
                aria-label={`${cat.title}: ${preferences[cat.key] ? 'activado' : 'desactivado'}`}
                onClick={() => handleToggle(cat.key)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  preferences[cat.key] ? 'bg-lumtek-blue' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    preferences[cat.key] ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSave}
          className="rounded-lg bg-lumtek-blue px-5 py-2.5 text-sm font-semibold text-white hover:brightness-105"
        >
          Guardar configuración
        </button>
        {showClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-lumtek-border px-5 py-2.5 text-sm text-lumtek-text-secondary hover:bg-lumtek-surface"
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  )
}
