type FloatingOrbProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'cyan' | 'violet'
}

const sizeMap = {
  sm: 'h-32 w-32',
  md: 'h-48 w-48',
  lg: 'h-72 w-72',
}

const colorMap = {
  blue: 'bg-lumtek-blue/20',
  cyan: 'bg-lumtek-cyan/15',
  violet: 'bg-lumtek-violet/15',
}

export const FloatingOrb = ({
  className = '',
  size = 'md',
  color = 'blue',
}: FloatingOrbProps) => {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl animate-float ${sizeMap[size]} ${colorMap[color]} ${className}`}
      aria-hidden
    />
  )
}
