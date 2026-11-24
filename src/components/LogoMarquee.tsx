import { marquee } from '../logos'
import { Logo } from './Logo'

/** Infinite strip of the stack under the hero. Pauses on hover; static under reduced motion. */
export function LogoMarquee() {
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {marquee.map((t) => (
        <li key={t.name} className="marquee-item">
          <Logo tool={t} size={22} />
          <span>{t.name}</span>
        </li>
      ))}
    </ul>
  )
  return (
    <section className="marquee" aria-labelledby="marquee-title">
      <h2 id="marquee-title" className="sr-only">
        Tools I work with
      </h2>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}
