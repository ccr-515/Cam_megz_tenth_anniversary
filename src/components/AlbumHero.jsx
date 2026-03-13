export function AlbumHero({
  title,
  subtitle,
  location,
  yearsLabel,
  intro,
  dayCount,
  slotCount,
  musicControl
}) {
  return (
    <header className="hero">
      <div className="hero__copy">
        <p className="hero__eyebrow">Puerto Rico 2026</p>
        <h1>{title}</h1>
        <p className="hero__subtitle">{subtitle}</p>
        {intro ? <p className="hero__intro">{intro}</p> : null}
      </div>

      <aside className="hero__aside">
        <div className="hero__flag" aria-hidden="true">
          <span className="hero__flag-stripe hero__flag-stripe--red" />
          <span className="hero__flag-stripe hero__flag-stripe--sand" />
          <span className="hero__flag-stripe hero__flag-stripe--blue" />
          <svg viewBox="0 0 100 100" role="presentation">
            <polygon points="50,10 59,38 88,38 64,56 74,86 50,68 26,86 36,56 12,38 41,38" />
          </svg>
        </div>

        <dl className="hero__stats">
          <div>
            <dt>Location</dt>
            <dd>{location}</dd>
          </div>
          <div>
            <dt>Story</dt>
            <dd>{yearsLabel}</dd>
          </div>
          <div>
            <dt>Days</dt>
            <dd>{dayCount}</dd>
          </div>
          <div>
            <dt>Moments</dt>
            <dd>{slotCount}</dd>
          </div>
        </dl>

        {musicControl}
      </aside>
    </header>
  );
}
