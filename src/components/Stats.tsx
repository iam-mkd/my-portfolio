import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

export type Stat = { value: number; suffix?: string; label: string }

function Counter({ stat, run }: { stat: Stat; run: boolean }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run || reduce) return
    let raf = 0
    const start = performance.now()
    const dur = 1100
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      setN(Math.round(stat.value * (1 - (1 - p) ** 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, reduce, stat.value])

  return (
    <div className="stat">
      <dt className="stat-label">{stat.label}</dt>
      <dd className="stat-value">
        <span aria-hidden>
          {reduce ? stat.value : n}
          {stat.suffix}
        </span>
        <span className="sr-only">
          {stat.value}
          {stat.suffix}
        </span>
      </dd>
    </div>
  )
}

/** Résumé numbers that count up once, the first time they scroll into view. */
export function Stats({ items }: { items: Stat[] }) {
  const ref = useRef<HTMLDListElement>(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <dl ref={ref} className="stats">
      {items.map((s) => (
        <Counter key={s.label} stat={s} run={run} />
      ))}
    </dl>
  )
}
