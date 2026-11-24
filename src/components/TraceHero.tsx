import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { spans, TRACE_TOTAL, type Span } from '../trace'
import { profile } from '../content'

const EASE = [0.22, 1, 0.36, 1] as const
/** Real milliseconds of animation per trace millisecond. */
const SCALE = 6

function TraceRow({
  span,
  run,
  active,
  onSelect,
}: {
  span: Span
  run: number
  active: boolean
  onSelect: (id: string) => void
}) {
  const reduce = useReducedMotion()
  const left = (span.start / TRACE_TOTAL) * 100
  const width = (span.duration / TRACE_TOTAL) * 100
  const delay = reduce ? 0 : 0.35 + (span.start * SCALE) / 1000
  const duration = reduce ? 0 : Math.max(0.25, (span.duration * SCALE) / 1000)

  return (
    <li>
      <button
        type="button"
        className="trace-row"
        data-active={active || undefined}
        aria-pressed={active}
        onMouseEnter={() => onSelect(span.id)}
        onFocus={() => onSelect(span.id)}
        onClick={() => onSelect(span.id)}
      >
        <span className="trace-name" style={{ paddingLeft: `${span.depth * 14}px` }}>
          {span.depth > 0 && <span className="trace-elbow" aria-hidden />}
          <span className="trace-service">{span.service}</span>
          <span className="trace-op">{span.name}</span>
        </span>
        <span className="trace-track" aria-hidden>
          <motion.span
            key={`bar-${run}`}
            className="trace-bar"
            data-status={span.status}
            style={{ left: `${left}%`, width: `${width}%` }}
            initial={{ scaleX: 0, opacity: 0.4 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay, duration, ease: EASE }}
          />
        </span>
        <motion.span
          key={`ms-${run}`}
          className="trace-ms"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + duration * 0.8, duration: 0.3 }}
        >
          {span.duration} ms
        </motion.span>
      </button>
    </li>
  )
}

export function TraceHero() {
  const [selected, setSelected] = useState('root')
  const [run, setRun] = useState(0)
  const span = spans.find((s) => s.id === selected) ?? spans[0]
  const ticks = [0, 60, 120, 180, 240]

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <motion.h1
          id="hero-title"
          className="hero-title"
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {profile.name}
        </motion.h1>
        <motion.p
          className="hero-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          {profile.intro}
        </motion.p>
        <motion.div
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <span>
            {profile.role} at {profile.company}
          </span>
          <span>{profile.location}</span>
          {profile.openToWork && (
            <span className="status-pill">
              <span className="status-dot" aria-hidden />
              Open to backend and platform roles
            </span>
          )}
        </motion.div>
      </div>

      <div className="trace" role="group" aria-label="My stack, drawn as a request trace">
        <div className="trace-head">
          <p className="trace-title">
            <span className="trace-id">trace 4f1c…a29e</span>
            <span className="trace-sub">
              {spans.length} spans, {TRACE_TOTAL} ms. Hover or tab through a span to read it.
            </span>
          </p>
          <button type="button" className="ghost-btn" onClick={() => setRun((r) => r + 1)}>
            Replay
          </button>
        </div>

        <div className="trace-ruler" aria-hidden>
          <span />
          <span className="trace-ticks">
            {ticks.map((t) => (
              <span key={t} style={{ left: `${(t / TRACE_TOTAL) * 100}%` }}>
                {t}
              </span>
            ))}
          </span>
          <span />
        </div>

        <ol className="trace-rows">
          {spans.map((s) => (
            <TraceRow key={s.id} span={s} run={run} active={s.id === selected} onSelect={setSelected} />
          ))}
        </ol>

        <div className="trace-attrs" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.dl
              key={span.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE }}
            >
              {span.attrs.map(([k, v]) => (
                <div key={k} className="attr">
                  <dt>{k}</dt>
                  <dd data-warn={k.startsWith('fault') || undefined}>{v}</dd>
                </div>
              ))}
            </motion.dl>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
