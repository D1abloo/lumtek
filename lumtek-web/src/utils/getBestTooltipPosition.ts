export type TooltipPlacement = 'right' | 'left' | 'bottom' | 'top'

export type TooltipPosition = {
  x: number
  y: number
  placement: TooltipPlacement
}

const PADDING = 8
const GAP = 10

const coordsFor = (
  p: TooltipPlacement,
  hotspotX: number,
  hotspotY: number,
  hotspotR: number,
  tooltipW: number,
  tooltipH: number,
) => {
  switch (p) {
    case 'right':
      return { x: hotspotX + hotspotR + GAP, y: hotspotY - tooltipH / 2 }
    case 'left':
      return { x: hotspotX - hotspotR - GAP - tooltipW, y: hotspotY - tooltipH / 2 }
    case 'bottom':
      return { x: hotspotX - tooltipW / 2, y: hotspotY + hotspotR + GAP }
    case 'top':
      return { x: hotspotX - tooltipW / 2, y: hotspotY - hotspotR - GAP - tooltipH }
  }
}

const scorePlacement = (
  p: TooltipPlacement,
  x: number,
  y: number,
  containerW: number,
  containerH: number,
  tooltipW: number,
  tooltipH: number,
) => {
  const overflow =
    Math.max(0, PADDING - x) +
    Math.max(0, x + tooltipW + PADDING - containerW) +
    Math.max(0, PADDING - y) +
    Math.max(0, y + tooltipH + PADDING - containerH)

  const centerBias =
    p === 'right' || p === 'left'
      ? Math.abs(y + tooltipH / 2 - containerH / 2) * 0.02
      : Math.abs(x + tooltipW / 2 - containerW / 2) * 0.02

  return overflow * 100 + centerBias
}

export const getBestTooltipPosition = (
  containerW: number,
  containerH: number,
  hotspotX: number,
  hotspotY: number,
  hotspotR: number,
  tooltipW: number,
  tooltipH: number,
): TooltipPosition => {
  const placements: TooltipPlacement[] = ['right', 'left', 'bottom', 'top']

  let best: TooltipPosition = { x: PADDING, y: PADDING, placement: 'top' }
  let bestScore = Number.POSITIVE_INFINITY

  for (const placement of placements) {
    let { x, y } = coordsFor(placement, hotspotX, hotspotY, hotspotR, tooltipW, tooltipH)
    x = Math.max(PADDING, Math.min(x, containerW - tooltipW - PADDING))
    y = Math.max(PADDING, Math.min(y, containerH - tooltipH - PADDING))
    const score = scorePlacement(placement, x, y, containerW, containerH, tooltipW, tooltipH)
    if (score < bestScore) {
      bestScore = score
      best = { x, y, placement }
    }
  }

  return best
}
