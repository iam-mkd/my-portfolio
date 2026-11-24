import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'

const BASE = '/media/runweave'

type Tab = { id: string; label: string; caption: string; shot?: string }

const TABS: Tab[] = [
  {
    id: 'demo',
    label: 'Demo',
    caption: 'Eval and load-test an agent from the CLI, then inspect the run in the workspace.',
  },
  {
    id: 'run',
    label: 'Run timeline',
    caption: 'Every model decision and tool call in one run, with timings, tokens and estimated cost.',
    shot: 'run-detail',
  },
  {
    id: 'evals',
    label: 'Evals',
    caption: 'Dataset cases with assertions, pass-rate gates and baselines.',
    shot: 'evals',
  },
  {
    id: 'load',
    label: 'Load tests',
    caption: 'Concurrency sweeps with and without seeded faults like rate limits and timeouts.',
    shot: 'load-tests',
  },
]

function DemoVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()

  // Play only while on screen; never autoplay under reduced motion.
  useEffect(() => {
    const v = ref.current
    if (!v || reduce) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.4 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [reduce])

  return (
    <video
      ref={ref}
      className="media-frame"
      src={`${BASE}/demo.mp4`}
      poster={`${BASE}/demo-poster.jpg`}
      width={960}
      height={570}
      muted
      loop
      playsInline
      preload="none"
      controls={reduce ?? false}
      aria-label="12-second RunWeave demo: running evals and a load test from the CLI, then the workspace"
    />
  )
}

export function RunWeaveMedia() {
  const [active, setActive] = useState('demo')
  const base = useId()
  const tab = TABS.find((t) => t.id === active) ?? TABS[0]

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = TABS[(i + dir + TABS.length) % TABS.length]
    setActive(next.id)
    document.getElementById(`${base}-tab-${next.id}`)?.focus()
  }

  return (
    <div className="media">
      <div className="media-tabs" role="tablist" aria-label="RunWeave screens">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            id={`${base}-tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={t.id === active}
            aria-controls={`${base}-panel`}
            tabIndex={t.id === active ? 0 : -1}
            className="media-tab"
            onClick={() => setActive(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.id === active && (
              <m.span
                layoutId={`${base}-pill`}
                className="media-tab-pill"
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
            <span className="media-tab-text">{t.label}</span>
          </button>
        ))}
      </div>
      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`} className="media-panel">
        <div className="media-stage">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div
              key={tab.id}
              className="media-layer"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab.shot ? (
                <>
                  <img
                    className="media-frame shot-dark"
                    src={`${BASE}/${tab.shot}-dark.webp`}
                    width={1360}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    alt={`RunWeave workspace: ${tab.label.toLowerCase()} screen`}
                  />
                  <img
                    className="media-frame shot-light"
                    src={`${BASE}/${tab.shot}-light.webp`}
                    width={1360}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    alt={`RunWeave workspace: ${tab.label.toLowerCase()} screen`}
                  />
                </>
              ) : (
                <DemoVideo />
              )}
            </m.div>
          </AnimatePresence>
        </div>
        <p className="media-caption">{tab.caption}</p>
      </div>
    </div>
  )
}
