import { AlbumHero } from "./components/AlbumHero";
import { AnimatedScene } from "./components/AnimatedScene";
import { DaySection } from "./components/DaySection";
import { MusicToggle } from "./components/MusicToggle";
import { PrintSection } from "./components/PrintSection";
import { useAlbumData } from "./hooks/useAlbumData";
import { useBackgroundAudio } from "./hooks/useBackgroundAudio";

function LoadingState() {
  return (
    <div className="status-panel" role="status" aria-live="polite">
      <p className="status-panel__eyebrow">Opening Puerto Rico</p>
      <p className="status-panel__text">Gathering the chapters of the trip.</p>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="status-panel status-panel--error" role="alert">
      <p className="status-panel__eyebrow">Album data unavailable</p>
      <p className="status-panel__text">{message}</p>
      <p className="status-panel__text">Check /data/album.json and try again.</p>
    </div>
  );
}

export default function App() {
  const { album, loading, error } = useAlbumData();
  const sections = [...album.days, album.extras];
  const totalSlots = sections.reduce((count, section) => count + section.photos.length, 0);
  const music = useBackgroundAudio(album.audio.src);

  return (
    <div className="app-shell">
      <AnimatedScene />

      <main className="page">
        <AlbumHero
          title={album.title}
          subtitle={album.subtitle}
          location={album.location}
          yearsLabel={album.yearsLabel}
          intro={album.intro}
          dayCount={album.days.length}
          slotCount={totalSlots}
          musicControl={
            <MusicToggle
              label={album.audio.label}
              isPlaying={music.isPlaying}
              isConfigured={music.isConfigured}
              isAvailable={music.isAvailable}
              message={music.message}
              onToggle={music.toggle}
            />
          }
        />

        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}

        {!loading && !error ? (
          <div className="album-sections">
            {sections.map((section) => (
              <DaySection key={section.id} section={section} />
            ))}
          </div>
        ) : null}

        <PrintSection url={album.printUrl} />
      </main>
    </div>
  );
}
