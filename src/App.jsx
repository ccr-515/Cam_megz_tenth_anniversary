import { useEffect, useMemo, useState } from "react";
import { AlbumHero } from "./components/AlbumHero";
import { AnimatedScene } from "./components/AnimatedScene";
import { DaySection } from "./components/DaySection";
import { LanguageToggle } from "./components/LanguageToggle";
import { MusicToggle } from "./components/MusicToggle";
import { PrintSection } from "./components/PrintSection";
import { useAlbumData } from "./hooks/useAlbumData";
import { useBackgroundAudio } from "./hooks/useBackgroundAudio";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  UI_COPY,
  localizeAlbum
} from "./lib/i18n";

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return savedLanguage === "es" ? "es" : DEFAULT_LANGUAGE;
}

function LoadingState({ copy }) {
  return (
    <div className="status-panel" role="status" aria-live="polite">
      <p className="status-panel__eyebrow">{copy.eyebrow}</p>
      <p className="status-panel__text">{copy.text}</p>
    </div>
  );
}

function ErrorState({ message, copy }) {
  return (
    <div className="status-panel status-panel--error" role="alert">
      <p className="status-panel__eyebrow">{copy.eyebrow}</p>
      <p className="status-panel__text">{message}</p>
      <p className="status-panel__text">{copy.footer}</p>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const { album, loading, error } = useAlbumData();
  const localizedAlbum = useMemo(() => localizeAlbum(album, language), [album, language]);
  const ui = UI_COPY[language] ?? UI_COPY.en;
  const sections = [...localizedAlbum.days, localizedAlbum.extras];
  const totalSlots = sections.reduce((count, section) => count + section.photos.length, 0);
  const music = useBackgroundAudio(localizedAlbum.audio.src);
  const musicMessage =
    music.status === "ready" || music.isPlaying
      ? ui.music.ready
      : music.status === "missing" || music.status === "error"
        ? ui.music.missing
        : "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }, [language]);

  return (
    <div className="app-shell">
      <AnimatedScene />

      <main className="page">
        <AlbumHero
          eyebrow={ui.heroEyebrow}
          title={localizedAlbum.title}
          subtitle={localizedAlbum.subtitle}
          location={localizedAlbum.location}
          story={localizedAlbum.story}
          intro={localizedAlbum.intro}
          dayCount={localizedAlbum.days.length}
          slotCount={totalSlots}
          labels={ui.hero}
          languageToggle={
            <LanguageToggle
              language={language}
              onChange={setLanguage}
              copy={ui.languageToggle}
            />
          }
          musicControl={
            <MusicToggle
              label={localizedAlbum.audio.label}
              isPlaying={music.isPlaying}
              isConfigured={music.isConfigured}
              isAvailable={music.isAvailable}
              message={musicMessage}
              copy={ui.music}
              onToggle={music.toggle}
            />
          }
        />

        {loading ? <LoadingState copy={ui.loading} /> : null}
        {error ? <ErrorState message={error} copy={ui.error} /> : null}

        {!loading && !error ? (
          <div className="album-sections">
            {sections.map((section) => (
              <DaySection
                key={section.id}
                section={section}
                swipeHint={ui.day.swipeHint}
                placeholderCopy={ui.placeholder.followup}
              />
            ))}
          </div>
        ) : null}

        <PrintSection url={localizedAlbum.printUrl} copy={ui.print} />
      </main>
    </div>
  );
}
