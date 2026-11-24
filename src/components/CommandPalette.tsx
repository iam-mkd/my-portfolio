import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { moreProjects, profile, runweave, scoutflow } from '../content'
import { goToSection } from '../navigate'
import { copyText } from '../clipboard'
import { Search } from './icons'

type Command = { id: string; label: string; hint: string; run: () => void; nav?: boolean }

type Props = { onClose: () => void; onToggleTheme: () => void; theme: string }

export function CommandPalette({ open, ...props }: Props & { open: boolean }) {
  return <AnimatePresence>{open && <PaletteBody key="palette" {...props} />}</AnimatePresence>
}

const openTab = (href: string) => window.open(href, '_blank', 'noopener')

function PaletteBody({ onClose, onToggleTheme, theme }: Props) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [flash, setFlash] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const commands = useMemo<Command[]>(() => {
    const section = (id: string, label: string): Command => ({
      id: `go-${id}`,
      label,
      hint: 'Section',
      nav: true,
      run: () => goToSection(id),
    })
    const projects = [runweave, scoutflow, ...moreProjects]
    return [
      section('work', 'Go to selected work'),
      section('experience', 'Go to experience'),
      section('recently', 'Go to recent updates'),
      section('contact', 'Go to contact'),
      { id: 'cv', label: 'View résumé', hint: 'PDF', run: () => openTab(profile.resume) },
      {
        id: 'email',
        label: 'Copy email address',
        hint: profile.email,
        run: () => void copyText(profile.email).then((ok) => ok && setFlash('Email copied')),
      },
      { id: 'li', label: 'Open LinkedIn profile', hint: 'linkedin.com', run: () => openTab(profile.linkedin) },
      { id: 'gh', label: 'Open GitHub profile', hint: 'github.com', run: () => openTab(profile.github) },
      {
        id: 'theme',
        label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        hint: 'Appearance',
        run: onToggleTheme,
      },
      ...projects.map((p) => ({
        id: `p-${p.name}`,
        label: `Open ${p.name} source on GitHub`,
        hint: 'Project',
        run: () => openTab(p.repo),
      })),
    ]
  }, [theme, onToggleTheme])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    returnFocus.current = document.activeElement as HTMLElement | null
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      cancelAnimationFrame(raf)
      if (returnFocus.current) returnFocus.current.focus({ preventScroll: true })
    }
  }, [])

  const runAt = (i: number) => {
    const cmd = results[i]
    if (!cmd) return
    // A section jump moves focus to its heading; don't pull it back on close.
    if (cmd.nav) returnFocus.current = null
    cmd.run()
    if (cmd.id === 'email') {
      window.setTimeout(onClose, 700)
    } else {
      onClose()
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      runAt(index)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  return (
    <m.div
      className="palette-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <m.div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        initial={{ opacity: 0, scale: 0.97, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -4 }}
        transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.8 }}
        onKeyDown={onKey}
      >
        <div className="palette-input">
          <Search size={16} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIndex(0)
            }}
            placeholder="Jump to a section, copy email, open a project"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `cmd-${results[index].id.replace(/\W/g, '')}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>esc</kbd>
        </div>
        <ul id="palette-list" className="palette-list" role="listbox">
          {results.map((c, i) => (
            <li
              key={c.id}
              id={`cmd-${c.id.replace(/\W/g, '')}`}
              role="option"
              aria-selected={i === index}
              className="palette-item"
              onMouseMove={() => setIndex(i)}
              onClick={() => runAt(i)}
            >
              {i === index && (
                <m.span
                  layoutId="palette-highlight"
                  className="palette-highlight"
                  transition={{ type: 'spring', stiffness: 700, damping: 45 }}
                />
              )}
              <span className="palette-label">{c.label}</span>
              <span className="palette-hint">{c.hint}</span>
            </li>
          ))}
          {results.length === 0 && (
            <li className="palette-empty">No command matches “{query}”. Try “email” or “work”.</li>
          )}
        </ul>
        <div className="palette-foot" aria-live="polite">
          {flash || (
            <>
              <span>
                <kbd>↑</kbd> <kbd>↓</kbd> to move
              </span>
              <span>
                <kbd>enter</kbd> to run
              </span>
            </>
          )}
        </div>
      </m.div>
    </m.div>
  )
}
