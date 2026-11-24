import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { profile } from '../content'
import { onSectionLink } from '../navigate'
import { Moon, Sun } from './icons'

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'recently', label: 'Recently' },
  { id: 'contact', label: 'Contact' },
]

const EASE = [0.22, 1, 0.36, 1] as const

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

/** Thin reading-progress line along the bottom of the header. */
function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return <span ref={ref} className="scroll-progress" aria-hidden />
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const id = useId()
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!panelRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <div className="mobile-menu">
      <button
        ref={btnRef}
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="menu-icon" data-open={open || undefined} aria-hidden>
          <span />
          <span />
        </span>
        {open ? 'Close' : 'Menu'}
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id={id}
            className="menu-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <nav aria-label="Sections">
              <ul>
                {NAV.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} onClick={(e) => onSectionLink(e, n.id, () => setOpen(false))}>
                      {n.label}
                    </a>
                  </li>
                ))}
                <li className="menu-sep">
                  <a href={profile.resume} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                    Résumé (PDF)
                  </a>
                </li>
              </ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
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
      <ScrollProgress />
      <div className="site-header-inner">
        <a href="#top" className="mark" aria-label={`${profile.name}, back to top`}>
          <span className="mark-glyph" aria-hidden>
            mkd
          </span>
          <span className="mark-name">{profile.shortName}</span>
        </a>

        <nav aria-label="Sections" className="nav">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="nav-link"
              aria-current={active === n.id ? 'true' : undefined}
              onClick={(e) => onSectionLink(e, n.id)}
            >
              {active === n.id && (
                <m.span
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
          <a className="header-resume" href={profile.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
          <button
            type="button"
            className="kbd-btn"
            onClick={onOpenPalette}
            aria-label="Open command menu"
            title="Command menu"
          >
            <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
            <kbd>K</kbd>
          </button>
          <MobileMenu />
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <m.span
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ display: 'inline-flex' }}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </m.span>
          </button>
        </div>
      </div>
    </header>
  )
}
