import { useEffect, useMemo, useState } from "react";
import { toImageCandidateUrls } from "../lib/assetPaths";
import { FrameFlourish } from "./FrameFlourish";

const CARD_VARIANTS = ["warm", "sea", "blush"];
const NOTE_PLACEHOLDERS = new Set([
  "replace the file or update this path later."
]);

export function PhotoCard({ photo, index, placeholderCopy }) {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isMissing, setIsMissing] = useState(false);
  const imageCandidates = useMemo(() => toImageCandidateUrls(photo.src), [photo.src]);
  const imageUrl = imageCandidates[candidateIndex] ?? "";
  const variant = CARD_VARIANTS[index % CARD_VARIANTS.length];
  const location = typeof photo.location === "string" ? photo.location.trim() : "";
  const note = typeof photo.note === "string" ? photo.note.trim() : "";
  const sanitizedNote = NOTE_PLACEHOLDERS.has(note.toLowerCase()) ? "" : note;
  const hasMeta = Boolean(location || sanitizedNote);

  useEffect(() => {
    setCandidateIndex(0);
    setIsMissing(false);
  }, [photo.src]);

  function handleImageError() {
    if (candidateIndex < imageCandidates.length - 1) {
      setCandidateIndex((currentIndex) => currentIndex + 1);
      return;
    }

    setIsMissing(true);
  }

  return (
    <article className={`photo-card photo-card--${variant}`}>
      <FrameFlourish layer="under" />

      <div className="photo-card__media">
        {imageUrl && !isMissing ? (
          <img
            className="photo-card__image"
            src={imageUrl}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
          />
        ) : (
          <div className="photo-card__placeholder">
            <div className="photo-card__placeholder-panel">
              <p>{photo.title}</p>
              <span>{photo.src}</span>
              <small>{placeholderCopy}</small>
            </div>
          </div>
        )}

        <span className="photo-card__slot">{photo.title}</span>
      </div>

      <div className="photo-card__body">
        {hasMeta ? (
          <p className="photo-card__meta">
            {location ? <span>{location}</span> : null}
            {sanitizedNote ? <span>{sanitizedNote}</span> : null}
          </p>
        ) : null}
        <h3>{photo.title}</h3>
        <p className="photo-card__caption">{photo.caption}</p>
      </div>

      <FrameFlourish layer="over" />
    </article>
  );
}
