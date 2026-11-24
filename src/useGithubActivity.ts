import { useEffect, useState } from 'react'
import { profile } from './content'

export type Activity = {
  id: string
  date: string
  title: string
  detail?: string
  url: string
  source: 'github' | 'linkedin'
  label: string
}

/** Snapshot used until (or if) the live GitHub request answers. */
const FALLBACK: Activity[] = [
  {
    id: 'gh-RunWeave',
    date: '2026-11-23T09:06:48Z',
    title: 'RunWeave',
    detail:
      'Test your AI agents like the rest of your code: evals, load tests, injected provider faults and version comparisons.',
    url: 'https://github.com/iam-mkd/RunWeave',
    source: 'github',
    label: 'Pushed',
  },
  {
    id: 'gh-TraceLens',
    date: '2026-10-28T17:16:23Z',
    title: 'TraceLens',
    detail: 'Local-first reliability lab: cache-stampede experiments with OpenTelemetry traces.',
    url: 'https://github.com/iam-mkd/TraceLens',
    source: 'github',
    label: 'Pushed',
  },
  {
    id: 'gh-ScoutFlow',
    date: '2026-10-14T13:16:22Z',
    title: 'ScoutFlow',
    detail: 'A privacy-focused, AI-powered web scraper and question-answering REST API.',
    url: 'https://github.com/iam-mkd/ScoutFlow',
    source: 'github',
    label: 'Pushed',
  },
  {
    id: 'gh-Issue-Analyser',
    date: '2026-05-31T14:12:19Z',
    title: 'AI-Powered-Production-Issue-Analyser',
    detail: 'An AI powered prod incident analyser built with Python.',
    url: 'https://github.com/iam-mkd/AI-Powered-Production-Issue-Analyser',
    source: 'github',
    label: 'Pushed',
  },
]

type Repo = {
  name: string
  description: string | null
  html_url: string
  pushed_at: string
  fork: boolean
}

const SKIP = new Set(['my-portfolio'])

export function useGithubActivity(limit = 5) {
  const [items, setItems] = useState<Activity[]>(FALLBACK)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=12`, {
      signal: ctrl.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? (r.json() as Promise<Repo[]>) : Promise.reject(r.status)))
      .then((repos) => {
        const next = repos
          .filter((r) => !r.fork && !SKIP.has(r.name))
          .slice(0, limit)
          .map<Activity>((r) => ({
            id: `gh-${r.name}`,
            date: r.pushed_at,
            title: r.name,
            detail: r.description ?? undefined,
            url: r.html_url,
            source: 'github',
            label: 'Pushed',
          }))
        if (next.length) {
          setItems(next)
          setLive(true)
        }
      })
      .catch(() => {
        /* Rate limited or offline: keep the snapshot. */
      })
    return () => ctrl.abort()
  }, [limit])

  return { items, live }
}
