import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile, projects } from '../content'
import { copyText } from '../clipboard'
import { Search } from './icons'

type Command = { id: string; label: string; hint: string; run: () => void }

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type Props = { onClose: () => void; onToggleTheme: () => void; theme: string }

export function CommandPalette({ open, ...props }: Props & { open: boolean }) {
  return <AnimatePresence>{open && <PaletteBody key="palette" {...props} />}</AnimatePresence>
}

function PaletteBody({ onClose, onToggleTheme, theme }: Props) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [flash, setFlash] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const commands = useMemo<Command[]>(() => {
    const list: Command[] = [
      { id: 'work', label: 'Go to selected work', hint: 'Section', run: () => scrollToId('work') },
      { id: 'exp', label: 'Go to experience', hint: 'Section', run: () => scrollToId('experience') },
      { id: 'recent', label: 'Go to recent activity', hint: 'Section', run: () => scrollToId('recently') },
      { id: 'contact', label: 'Go to contact', hint: 'Section', run: () => scrollToId('contact') },
      {
        id: 'email',
        label: 'Copy email address',
        hint: profile.email,
        run: () => void copyText(profile.email).then((ok) => ok && setFlash('Email copied')),
      },
      {
        id: 'gh',
        label: 'Open GitHub profile',
        hint: 'github.com',
        run: () => window.open(profile.github, '_blank', 'noopener'),
      },
      {
        id: 'theme',
        label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        hint: 'Appearance',
        run: onToggleTheme,
      },
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        label: `Open ${p.name} on GitHub`,
        hint: 'Project',
        run: () => window.open(p.repo, '_blank', 'noopener'),
      })),
    ]
    if (profile.linkedin)
      list.splice(6, 0, {
        id: 'li',
        label: 'Open LinkedIn profile',
        hint: 'linkedin.com',
        run: () => window.open(profile.linkedin, '_blank', 'noopener'),
      })
    if (profile.resume)
      list.splice(6, 0, {
        id: 'cv',
        label: 'Download resume',
        hint: 'PDF',
        run: () => window.open(profile.resume, '_blank', 'noopener'),
      })
    return list
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
      returnFocus.current?.focus?.({ preventScroll: true })
    }
  }, [])

  const runAt = (i: number) => {
    const cmd = results[i]
    if (!cmd) return
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
    <motion.div
      className="palette-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
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
            aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>esc</kbd>
        </div>
        <ul id="palette-list" className="palette-list" role="listbox">
          {results.map((c, i) => (
            <li
              key={c.id}
              id={`cmd-${c.id}`}
              role="option"
              aria-selected={i === index}
              className="palette-item"
              onMouseMove={() => setIndex(i)}
              onClick={() => runAt(i)}
            >
              {i === index && (
                <motion.span
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
      </motion.div>
    </motion.div>
  )
}
