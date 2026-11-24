import { alsoOwned, caseStudies, credentials, role, stats } from '../content'
import { companyLogo, toolbox } from '../logos'
import { ToolChip } from './Logo'
import { useIcon } from '../useIcon'
import { Stats } from './Stats'
import { ArrowUpRight } from './icons'

export function Experience() {
  const tcs = useIcon(companyLogo)
  return (
    <section id="experience" className="section" aria-labelledby="exp-title">
      <header className="section-head">
        <h2 id="exp-title">Experience</h2>
        <p className="section-note">What I owned, the constraint, and what changed.</p>
      </header>

      <Stats items={stats} />

      <div className="role-head">
        <span className="company-logo" aria-hidden>
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" focusable="false">
            {tcs && <path d={tcs.path} />}
          </svg>
        </span>
        <h3>
          {role.title}
          <span className="role-at"> at {role.company}</span>
        </h3>
        <p className="role-meta">
          <time dateTime={role.start}>{role.period}</time>
          <span>{role.location}</span>
        </p>
      </div>
      <p className="role-client">Client: {role.client}</p>
      <p className="role-summary">{role.summary}</p>

      <ol className="cases" aria-label="Work I owned">
        {caseStudies.map((c) => (
          <li key={c.title} className="case">
            <div className="case-metric">
              <span className="case-value">{c.metric.value}</span>
              <span className="case-label">{c.metric.label}</span>
            </div>
            <div className="case-body">
              <h4>{c.title}</h4>
              <dl className="case-facts">
                <div>
                  <dt>System</dt>
                  <dd>{c.system}</dd>
                </div>
                <div>
                  <dt>Constraint</dt>
                  <dd>{c.constraint}</dd>
                </div>
                <div>
                  <dt>What I changed</dt>
                  <dd>{c.change}</dd>
                </div>
                <div>
                  <dt>Result</dt>
                  <dd>{c.result}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ol>

      <div className="exp-grid">
        <div>
          <h3 className="sub-title">Also at TCS</h3>
          <ul className="role-points">
            {alsoOwned.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>

          <h3 className="sub-title">Education and credentials</h3>
          <ul className="creds">
            {credentials.map((c) => (
              <li key={c.label}>
                {c.url ? (
                  <a className="text-link" href={c.url} target="_blank" rel="noreferrer">
                    {c.label}
                    <ArrowUpRight />
                  </a>
                ) : (
                  <span className="cred-label">{c.label}</span>
                )}
                <span className="cred-detail">{c.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="sub-title">Toolbox</h3>
          <div className="toolbox">
            {toolbox.map((g) => (
              <div key={g.group} className="toolbox-group">
                <h4 className="toolbox-title">{g.group}</h4>
                <ul className="tool-chips">
                  {g.items.map((t) => (
                    <ToolChip key={t.name} tool={t} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
