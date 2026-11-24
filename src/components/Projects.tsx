import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { moreProjects, profile, runweave, scoutflow, type Detail } from '../content'
import { CopyButton } from './CopyButton'
import { ArrowUpRight } from './icons'

const EASE = [0.22, 1, 0.36, 1] as const

function Disclosure({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="disclosure" data-open={open || undefined}>
      <button
        type="button"
        className="disclosure-btn"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <m.span
          className="disclosure-icon"
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          +
        </m.span>
        {label}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={id}
            className="disclosure-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="disclosure-inner">{children}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Details({ items }: { items: Detail[] }) {
  return (
    <dl className="details">
      {items.map((d) => (
        <div key={d.heading}>
          <dt>{d.heading}</dt>
          <dd>{d.body}</dd>
        </div>
      ))}
    </dl>
  )
}

function SourceLink({ href, name }: { href: string; name: string }) {
  return (
    <a className="text-link" href={href} target="_blank" rel="noreferrer">
      {name} source on GitHub
      <ArrowUpRight />
    </a>
  )
}

function Lang({ lang }: { lang: string }) {
  return (
    <span className="project-lang" data-lang={lang}>
      {lang}
    </span>
  )
}

function EvalChart() {
  const p = scoutflow.proof
  return (
    <figure className="proof">
      <figcaption className="proof-title">{p.title}</figcaption>
      <table className="bars">
        <thead className="sr-only">
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Cases passed</th>
          </tr>
        </thead>
        <tbody>
          {p.rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>
                <span className="bar-track">
                  <span className="bar-rail">
                    <m.span
                      className="bar"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.7, ease: EASE }}
                      style={{ width: `${(r.value / r.max) * 100}%` }}
                    />
                  </span>
                  <span className="bar-value">
                    {r.value}
                    <span className="bar-of"> / {r.max}</span>
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="proof-conclusion">{p.conclusion}</p>
      <p className="proof-note">{p.note}</p>
    </figure>
  )
}

function RunReport() {
  const r = runweave.report
  return (
    <figure className="proof">
      <figcaption className="proof-title">{r.caption}</figcaption>
      <pre className="report" tabIndex={0} aria-label="Example RunWeave terminal output">
        <code>
          {r.lines.map((l) => (
            <span key={l.text} className="report-line" data-tone={l.tone}>
              {l.text}
            </span>
          ))}
        </code>
      </pre>
      <p className="proof-conclusion">{r.note}</p>
      <div className="install">
        <code>{runweave.install}</code>
        <CopyButton text={runweave.install} label="Copy install command" />
      </div>
    </figure>
  )
}

export function Projects() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <header className="section-head">
        <h2 id="work-title">Selected work</h2>
        <p className="section-note">Open source. Each shows the result first; details are folded away.</p>
      </header>

      <div className="featured">
        <article className="feature" aria-labelledby="p-runweave">
          <div className="feature-head">
            <h3 id="p-runweave">{runweave.name}</h3>
            <Lang lang={runweave.language} />
          </div>
          <p className="feature-summary">{runweave.summary}</p>
          <RunReport />
          <p className="stack-line">{runweave.stack.join(', ')}</p>
          <div className="feature-foot">
            <SourceLink href={runweave.repo} name={runweave.name} />
          </div>
          <Disclosure label="How RunWeave works">
            <Details items={runweave.details} />
          </Disclosure>
        </article>

        <article className="feature" aria-labelledby="p-scoutflow">
          <div className="feature-head">
            <h3 id="p-scoutflow">{scoutflow.name}</h3>
            <Lang lang={scoutflow.language} />
          </div>
          <p className="feature-summary">{scoutflow.summary}</p>
          <EvalChart />
          <p className="stack-line">{scoutflow.stack.join(', ')}</p>
          <div className="feature-foot more-links">
            <SourceLink href={scoutflow.repo} name={scoutflow.name} />
            <a className="text-link" href={scoutflow.evalLink.href} target="_blank" rel="noreferrer">
              {scoutflow.evalLink.label}
              <ArrowUpRight />
            </a>
          </div>
          <Disclosure label="How ScoutFlow works">
            <Details items={scoutflow.details} />
          </Disclosure>
        </article>
      </div>

      <h3 className="more-title">More projects</h3>
      <ul className="more">
        {moreProjects.map((p) => (
          <li key={p.slug} className="more-item">
            <div className="more-head">
              <h4>{p.name}</h4>
              <Lang lang={p.language} />
            </div>
            <p className="more-summary">{p.summary}</p>
            <div className="more-links">
              <SourceLink href={p.repo} name={p.name} />
              {p.link && (
                <a className="text-link" href={p.link.href} target="_blank" rel="noreferrer">
                  {p.link.label}
                  <ArrowUpRight />
                </a>
              )}
            </div>
            <Disclosure label={`${p.name} details`}>
              <Details items={p.details} />
              {p.example && (
                <div className="examples">
                  {p.example.map((ex) => (
                    <div key={ex.label} className="example">
                      <p className="example-label">{ex.label}</p>
                      <pre tabIndex={0} aria-label={`${p.name} example ${ex.label.toLowerCase()}`}>
                        <code>{ex.code}</code>
                      </pre>
                    </div>
                  ))}
                  <p className="proof-note">Synthetic example from the project README.</p>
                </div>
              )}
              <p className="stack-line">{p.stack.join(', ')}</p>
            </Disclosure>
          </li>
        ))}
      </ul>

      <p className="section-foot">
        Everything else, including Java Streams practice, is on{' '}
        <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
          github.com/{profile.githubUser}
        </a>
        .
      </p>
    </section>
  )
}
