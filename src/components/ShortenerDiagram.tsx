import { tools, type Tool } from '../logos'
import { Logo } from './Logo'

function Node({ tool, label, note }: { tool?: Tool; label: string; note?: string }) {
  return (
    <div className="flow-node">
      {tool && <Logo tool={tool} size={18} />}
      <span className="flow-label">{label}</span>
      {note && <span className="flow-note">{note}</span>}
    </div>
  )
}

/** Redirect path from the URL Shortener README: Redis first, MongoDB on a miss. */
export function ShortenerDiagram() {
  return (
    <figure className="flow" aria-labelledby="flow-cap">
      <div className="flow-grid" aria-hidden>
        <Node label="GET /k9Xa2B" note="client" />
        <span className="flow-arrow" />
        <Node tool={tools.springBoot} label="Spring Boot" note="decode Base62" />
        <span className="flow-arrow" />
        <div className="flow-branch">
          <Node tool={tools.redis} label="Redis" note="hit: 302" />
          <span className="flow-miss">miss</span>
          <Node tool={tools.mongodb} label="MongoDB" note="load, cache, 302" />
        </div>
      </div>
      <figcaption id="flow-cap" className="proof-note">
        Redirect path: Spring Boot decodes the code, reads Redis first, and on a miss loads from MongoDB and caches the
        result.
      </figcaption>
    </figure>
  )
}
