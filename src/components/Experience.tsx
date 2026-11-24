import { experience, profile, skills } from '../content'

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-title">
      <header className="section-head">
        <h2 id="exp-title">Experience</h2>
        <p className="section-note">Where I work, and what I reach for.</p>
      </header>

      <div className="exp-grid">
        <div className="exp-roles">
          {experience.map((r) => (
            <article key={r.company + r.title} className="role">
              <div className="role-head">
                <h3>
                  {r.title}
                  <span className="role-at"> at {r.company}</span>
                </h3>
                <p className="role-meta">
                  <span>{r.period}</span>
                  <span>{r.location}</span>
                </p>
              </div>
              <ul className="role-points">
                {r.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <ul className="tags" aria-label="Stack">
                {r.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          ))}

          <div className="about">
            {profile.about.map((a) => (
              <p key={a}>{a}</p>
            ))}
          </div>
        </div>

        <dl className="skills">
          {skills.map((g) => (
            <div key={g.group} className="skill-row">
              <dt>{g.group}</dt>
              <dd>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
