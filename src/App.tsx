import { useCallback, useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { Header } from './components/Header'
import { TraceHero } from './components/TraceHero'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Recently } from './components/Recently'
import { Contact } from './components/Contact'
import { CommandPalette } from './components/CommandPalette'
import { useTheme } from './useTheme'
import { profile } from './content'

const YEAR = new Date().getFullYear()

export default function App() {
  const { theme, toggle } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const close = useCallback(() => setPaletteOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header theme={theme} onToggleTheme={toggle} onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        <TraceHero />
        <Projects />
        <Experience />
        <Recently />
        <Contact />
      </main>
      <footer className="site-footer">
        <span>
          © {YEAR} {profile.name}
        </span>
        <span>Built with React, TypeScript and Motion</span>
      </footer>
      <CommandPalette open={paletteOpen} onClose={close} onToggleTheme={toggle} theme={theme} />
    </MotionConfig>
  )
}
