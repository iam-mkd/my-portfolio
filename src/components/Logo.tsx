import { luminance, type Tool } from '../logos'
import { useIcon } from '../useIcon'

/**
 * A brand mark in its own colour. Marks that would vanish on the current
 * background (near-black on dark, near-white on light) switch to the text
 * colour through `data-tone`.
 */
export function Logo({ tool, size = 20 }: { tool: Tool; size?: number }) {
  const icon = useIcon(tool.icon)
  if (tool.icon && !icon) {
    // Reserve the space until the icon chunk arrives.
    return <span className="logo" style={{ width: size, height: size }} aria-hidden />
  }
  if (!icon) {
    return (
      <span className="logo logo--mono" style={{ width: size, height: size }} aria-hidden>
        {tool.mono}
      </span>
    )
  }
  const hex = icon.hex
  const lum = luminance(hex)
  const tone = lum < 0.06 ? 'dark' : lum > 0.7 ? 'light' : undefined
  return (
    <svg
      className="logo"
      data-tone={tone}
      style={{ color: `#${hex}` }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  )
}

export function ToolChip({ tool }: { tool: Tool }) {
  return (
    <li className="tool-chip">
      <Logo tool={tool} size={18} />
      <span>{tool.name}</span>
    </li>
  )
}
