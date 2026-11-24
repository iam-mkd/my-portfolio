import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { projects, profile } from '../content'
import { CopyButton } from './CopyButton'
import { ArrowUpRight } from './icons'

const EASE = [0.22, 1, 0.36, 1] as const

export function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0].slug)

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <header className="section-head">
        <h2 id="work-title">Selected work</h2>
        <p className="section-note">{projects.length} open-source projects. Select one to see how it works.</p>
      </header>

      <ul className="projects">
        {projects.map((p) => {
          const isOpen = open === p.slug
          const panelId = `project-${p.slug}`
          return (
            <li key={p.slug} className="project" data-open={isOpen || undefined}>
              <button
                type="button"
                className="project-toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : p.slug)}
              >
                <span className="project-name">{p.name}</span>
                <span className="project-summary">{p.summary}</span>
                <span className="project-lang" data-lang={p.language}>
                  {p.language}
                </span>
                <motion.span
                  className="project-chevron"
                  aria-hidden
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    className="project-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="project-body">
                      <div className="project-text">
                        {p.detail.map((d) => (
                          <p key={d}>{d}</p>
                        ))}
                        <ul className="tags" aria-label="Stack">
                          {p.stack.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <aside className="project-side">
                        <dl className="facts">
                          {p.facts.map((f) => (
                            <div key={f.label}>
                              <dt>{f.label}</dt>
                              <dd>{f.value}</dd>
                            </div>
                          ))}
                        </dl>

                        {p.command && (
                          <div className="terminal">
                            <div className="terminal-bar">
                              <span>{p.command.label}</span>
                              <CopyButton text={p.command.lines.join('\n')} label="Copy commands" />
                            </div>
                            <pre>
                              <code>
                                {p.command.lines.map((l) => (
                                  <span key={l} className="terminal-line">
                                    {l}
                                  </span>
                                ))}
                              </code>
                            </pre>
                          </div>
                        )}

                        <a className="text-link" href={p.repo} target="_blank" rel="noreferrer">
                          View source on GitHub
                          <ArrowUpRight />
                        </a>
                      </aside>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>

      <p className="section-foot">
        More experiments, including Java Streams practice, live on{' '}
        <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
          github.com/{profile.githubUser}
        </a>
        .
      </p>
    </section>
  )
}
