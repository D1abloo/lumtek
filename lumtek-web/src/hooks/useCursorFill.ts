import { useRef, useState, type MouseEvent, type TouchEvent } from 'react'

type CursorFillState = {
  x: number
  y: number
  size: number
  active: boolean
  pressed: boolean
}

const measureFill = (el: HTMLElement, clientX: number, clientY: number) => {
  const rect = el.getBoundingClientRect()
  const x = clientX - rect.left
  const y = clientY - rect.top
  const size =
    Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y)) * 2.2
  return { x, y, size }
}

export const useCursorFill = () => {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<CursorFillState>({
    x: 0,
    y: 0,
    size: 0,
    active: false,
    pressed: false,
  })

  const fromPoint = (clientX: number, clientY: number) => {
    const el = ref.current
    if (!el) return
    const { x, y, size } = measureFill(el, clientX, clientY)
    setState((s) => ({ ...s, x, y, size }))
  }

  const handlers = {
    onMouseEnter: (e: MouseEvent) => {
      fromPoint(e.clientX, e.clientY)
      setState((s) => ({ ...s, active: true }))
    },
    onMouseMove: (e: MouseEvent) => {
      fromPoint(e.clientX, e.clientY)
    },
    onMouseLeave: () => {
      setState({ x: 0, y: 0, size: 0, active: false, pressed: false })
    },
    onMouseDown: (e: MouseEvent) => {
      fromPoint(e.clientX, e.clientY)
      setState((s) => ({ ...s, pressed: true }))
    },
    onMouseUp: () => {
      setState((s) => ({ ...s, pressed: false }))
    },
    onTouchStart: (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      const el = ref.current
      if (!el) return
      const { x, y, size } = measureFill(el, touch.clientX, touch.clientY)
      setState({ x, y, size, active: true, pressed: true })
    },
    onTouchEnd: () => {
      setState({ x: 0, y: 0, size: 0, active: false, pressed: false })
    },
  }

  const fillSize = state.pressed ? state.size * 1.06 : state.size

  return { ref, state, handlers, fillSize }
}
