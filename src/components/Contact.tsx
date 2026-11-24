import { profile } from '../content'
import { CopyButton } from './CopyButton'
import { ArrowUpRight } from './icons'

export function Contact() {
  const links = [
    { label: 'Résumé (PDF)', href: profile.resume },
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'GitHub', href: profile.github },
  ]

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="contact-title">
        Have a system that needs to stay up? Let’s talk.
      </h2>
      <p className="contact-roles">{profile.rolesSought}</p>
      <div className="contact-row">
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <CopyButton text={profile.email} label="Copy email address">
          Copy email
        </CopyButton>
      </div>
      <ul className="contact-links">
        {links.map((l) => (
          <li key={l.label}>
            <a className="text-link" href={l.href} target="_blank" rel="noreferrer">
              {l.label}
              <ArrowUpRight />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
