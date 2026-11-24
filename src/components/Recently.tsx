import { posts, profile } from '../content'
import { useGithubActivity, type Activity } from '../useGithubActivity'
import { ArrowUpRight } from './icons'

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

function relative(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (days < 1) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  return fmt.format(new Date(iso))
}

export function Recently() {
  const { items: gh, live } = useGithubActivity(5)

  const linkedin: Activity[] = posts.map((p) => ({
    id: `li-${p.url}`,
    date: p.date,
    title: p.title,
    url: p.url,
    source: 'linkedin',
    label: p.kind === 'article' ? 'Wrote' : p.kind === 'feature' ? 'Featured' : 'Posted',
  }))

  const feed = [...linkedin, ...gh].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 7)

  return (
    <section id="recently" className="section" aria-labelledby="recent-title">
      <header className="section-head">
        <h2 id="recent-title">Recently</h2>
        <p className="section-note">
          {live ? 'Live from GitHub' : 'From GitHub'}
          {posts.length > 0 && ' and LinkedIn'}, newest first.
        </p>
      </header>

      <ol className="feed">
        {feed.map((a) => (
          <li key={a.id}>
            <a className="feed-item" href={a.url} target="_blank" rel="noreferrer">
              <time className="feed-date" dateTime={a.date} title={fmt.format(new Date(a.date))}>
                {relative(a.date)}
              </time>
              <span className="feed-source" data-source={a.source}>
                {a.label} {a.source === 'github' ? 'on GitHub' : 'on LinkedIn'}
              </span>
              <span className="feed-title">
                {a.title}
                <span className="feed-arrow" aria-hidden>
                  <ArrowUpRight />
                </span>
              </span>
              {a.detail && <span className="feed-detail">{a.detail}</span>}
            </a>
          </li>
        ))}
      </ol>

      {profile.linkedin && (
        <p className="section-foot">
          I share notes on backend reliability and agent testing on{' '}
          <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          .
        </p>
      )}
    </section>
  )
}
