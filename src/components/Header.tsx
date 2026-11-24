import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { profile } from '../content'
import { Moon, Sun } from './icons'

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'recently', label: 'Recently' },
  { id: 'contact', label: 'Contact' },
]

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const onScroll = () => window.scrollY < 200 && setActive(null)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return active
}

export function Header({
  theme,
  onToggleTheme,
  onOpenPalette,
}: {
  theme: string
  onToggleTheme: () => void
  onOpenPalette: () => void
}) {
  const active = useActiveSection()
  const [isMac] = useState(() => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent))

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#top" className="mark" aria-label={`${profile.name}, back to top`}>
          <span className="mark-glyph" aria-hidden>
            mkd
          </span>
          <span className="mark-name">{profile.shortName}</span>
        </a>

        <nav aria-label="Sections" className="nav">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="nav-link" aria-current={active === n.id ? 'true' : undefined}>
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              <span className="nav-text">{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" className="kbd-btn" onClick={onOpenPalette} aria-label="Open command menu">
            <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
            <kbd>K</kbd>
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-flex' }}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </motion.span>
          </button>
        </div>
      </div>
    </header>
  )
}
