import { PhotoCard } from "./PhotoCard";

export function DaySection({ section, swipeHint, placeholderCopy }) {
  return (
    <section className="day-section" aria-labelledby={`${section.id}-title`}>
      <div className="day-section__header">
        <div className="day-section__copy">
          <p className="day-section__eyebrow">{section.label}</p>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          <p className="day-section__subtitle">{section.subtitle}</p>
        </div>
        <p className="day-section__hint">{swipeHint}</p>
      </div>

      <div className="day-section__rail">
        <div
          className="day-section__cards"
          role="region"
          aria-label={`${section.label}`}
          tabIndex={0}
        >
          {section.photos.map((photo, index) => (
            <PhotoCard key={photo.id} photo={photo} index={index} placeholderCopy={placeholderCopy} />
          ))}
        </div>
      </div>
    </section>
  );
}
