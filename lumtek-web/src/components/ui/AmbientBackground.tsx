import type { ReactNode } from 'react'

export const AmbientBackground = ({ children }: { children: ReactNode }) => (
  <div className="relative min-h-screen overflow-x-hidden bg-white">
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,168,255,0.06),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_0%,rgba(34,211,238,0.05),transparent)]" />
    </div>
    {children}
  </div>
)
