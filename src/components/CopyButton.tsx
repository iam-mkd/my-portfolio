import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy } from './icons'
import { copyText } from '../clipboard'

export function CopyButton({ text, label, children }: { text: string; label: string; children?: React.ReactNode }) {
  const [done, setDone] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <button
      type="button"
      className={children ? 'copy-btn copy-btn--text' : 'copy-btn'}
      aria-label={children ? undefined : label}
      onClick={async () => {
        if (await copyText(text)) {
          setDone(true)
          window.clearTimeout(timer.current)
          timer.current = window.setTimeout(() => setDone(false), 1600)
        }
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={done ? 'done' : 'idle'}
          className="copy-icon"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.15 }}
        >
          {done ? <Check /> : <Copy />}
        </motion.span>
      </AnimatePresence>
      {children && <span>{done ? 'Copied' : children}</span>}
      <span className="sr-only" aria-live="polite">
        {done ? 'Copied to clipboard' : ''}
      </span>
    </button>
  )
}
