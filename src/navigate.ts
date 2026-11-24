/**
 * Scroll to a section and move keyboard focus to its heading, so screen
 * reader and keyboard users land where they asked to go.
 */
export function goToSection(id: string) {
  const section = document.getElementById(id)
  if (!section) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  const heading = section.querySelector<HTMLElement>('h2, h1') ?? section
  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
  heading.focus({ preventScroll: true })
  try {
    history.replaceState(null, '', `#${id}`)
  } catch {
    /* sandboxed */
  }
}

/** Click handler for in-page anchors: keeps the href for no-JS and middle-click. */
export function onSectionLink(e: React.MouseEvent<HTMLAnchorElement>, id: string, after?: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  after?.()
  goToSection(id)
}
