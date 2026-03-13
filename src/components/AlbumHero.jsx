export function AlbumHero({
  eyebrow,
  title,
  subtitle,
  location,
  story,
  intro,
  dayCount,
  slotCount,
  musicControl,
  languageToggle,
  labels
}) {
  return (
    <header className="hero">
      <div className="hero__copy">
        <div className="hero__topline">
          <p className="hero__eyebrow">{eyebrow}</p>
          {languageToggle}
        </div>
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
            <dt>{labels.locationLabel}</dt>
            <dd>{location}</dd>
          </div>
          <div>
            <dt>{labels.storyLabel}</dt>
            <dd>{story}</dd>
          </div>
          <div>
            <dt>{labels.daysLabel}</dt>
            <dd>{dayCount}</dd>
          </div>
          <div>
            <dt>{labels.momentsLabel}</dt>
            <dd>{slotCount}</dd>
          </div>
        </dl>

        {musicControl}
      </aside>
    </header>
  );
}
