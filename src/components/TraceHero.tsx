import { useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { spans, TRACE_TOTAL, type Span } from '../trace'
import { profile } from '../content'
import { onSectionLink } from '../navigate'
import { ArrowUpRight } from './icons'

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
        <span className="trace-name" style={{ paddingLeft: `calc(${span.depth} * var(--indent))` }}>
          {span.depth > 0 && <span className="trace-elbow" aria-hidden />}
          <span className="trace-service">{span.service}</span>
          <span className="trace-op">{span.name}</span>
        </span>
        <span className="trace-track" aria-hidden>
          <m.span
            key={`bar-${run}`}
            className="trace-bar"
            data-status={span.status}
            style={{ left: `${left}%`, width: `${width}%` }}
            initial={{ scaleX: 0, opacity: 0.4 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay, duration, ease: EASE }}
          />
        </span>
        <m.span
          key={`ms-${run}`}
          className="trace-ms"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + duration * 0.8, duration: reduce ? 0 : 0.3 }}
        >
          {span.duration} ms
        </m.span>
      </button>
    </li>
  )
}

export function TraceHero() {
  const [selected, setSelected] = useState('root')
  const [run, setRun] = useState(0)
  const reduce = useReducedMotion()
  const span = spans.find((s) => s.id === selected) ?? spans[0]
  const ticks = [0, 60, 120, 180, 240]

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title" className="hero-title enter">
          {profile.name}
        </h1>
        <p className="hero-intro enter enter-2">{profile.intro}</p>
        <div className="enter enter-3">
          <p className="hero-meta">
            <span>
              {profile.role}, {profile.years}
            </span>
            <span>{profile.location}</span>
            <span className="status-pill">
              <span className="status-dot" aria-hidden />
              {profile.availability}
            </span>
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href={profile.resume} target="_blank" rel="noreferrer">
              View résumé
              <span className="btn-sub">PDF</span>
            </a>
            <a className="btn" href="#work" onClick={(e) => onSectionLink(e, 'work')}>
              View selected work
            </a>
            <a className="btn btn--quiet" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>

      <figure className="trace" aria-labelledby="trace-label">
        <figcaption className="trace-head">
          <span className="trace-title">
            <span id="trace-label" className="trace-label">
              Illustrative request trace
            </span>
            <span className="trace-sub">
              <span className="only-wide">
                My stack drawn as one request; timings are examples. Hover, tap or focus a span for details.
              </span>
              <span className="only-narrow">Timings are examples. Tap a span for details.</span>
            </span>
          </span>
          <button
            type="button"
            className="ghost-btn"
            onClick={() => setRun((r) => r + 1)}
            hidden={reduce ?? false}
            aria-label="Replay the trace animation"
          >
            Replay
          </button>
        </figcaption>

        <div className="trace-ruler" aria-hidden>
          <span />
          <span className="trace-ticks">
            {ticks.map((t) => (
              <span key={t} style={{ left: `${(t / TRACE_TOTAL) * 100}%` }}>
                {t} ms
              </span>
            ))}
          </span>
          <span />
        </div>

        <ol className="trace-rows" aria-label="Spans">
          {spans.map((s) => (
            <TraceRow key={s.id} span={s} run={run} active={s.id === selected} onSelect={setSelected} />
          ))}
        </ol>

        <div className="trace-attrs" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <m.dl
              key={span.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: EASE }}
            >
              {span.attrs.map(([k, v]) => (
                <div key={k} className="attr">
                  <dt>{k}</dt>
                  <dd data-warn={k.startsWith('fault') || undefined}>{v}</dd>
                </div>
              ))}
            </m.dl>
          </AnimatePresence>
        </div>
      </figure>
    </section>
  )
}
