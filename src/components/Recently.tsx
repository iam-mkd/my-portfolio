import { profile, updates } from '../content'
import { ArrowUpRight } from './icons'

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

export function Recently() {
  return (
    <section id="recently" className="section" aria-labelledby="recent-title">
      <header className="section-head">
        <h2 id="recent-title">Recently</h2>
        <p className="section-note">What shipped, newest first.</p>
      </header>

      <ol className="feed">
        {updates.map((u) => (
          <li key={u.title} className="feed-item">
            <p className="feed-meta">
              <time dateTime={u.date}>{fmt.format(new Date(u.date))}</time>
              <span>{u.source}</span>
            </p>
            <div>
              <h3 className="feed-title">
                <a href={u.url} target="_blank" rel="noreferrer">
                  {u.title}
                  <span className="feed-arrow" aria-hidden>
                    <ArrowUpRight />
                  </span>
                </a>
              </h3>
              <p className="feed-body">{u.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="section-foot">
        Day-to-day activity is on{' '}
        <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        , and notes on backend work on{' '}
        <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        .
      </p>
    </section>
  )
}
