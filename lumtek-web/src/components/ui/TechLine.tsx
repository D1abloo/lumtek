type TechLineProps = {
  className?: string
  direction?: 'horizontal' | 'vertical'
}

export const TechLine = ({
  className = '',
  direction = 'horizontal',
}: TechLineProps) => {
  const isHorizontal = direction === 'horizontal'

  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox={isHorizontal ? '0 0 200 4' : '0 0 4 200'}
      fill="none"
      aria-hidden
    >
      <line
        x1={isHorizontal ? '0' : '2'}
        y1={isHorizontal ? '2' : '0'}
        x2={isHorizontal ? '200' : '2'}
        y2={isHorizontal ? '2' : '200'}
        stroke="url(#techGradient)"
        strokeWidth="1"
        strokeDasharray="4 6"
        className="animate-lineFlow"
      />
      <defs>
        <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00A8FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00A8FF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
