export function MusicToggle({ label, isPlaying, isConfigured, isAvailable, message, onToggle }) {
  const controlLabel = /background music/i.test(label) ? "Soundtrack" : label;

  return (
    <div className="music-control">
      <button
        className="music-control__button"
        type="button"
        onClick={onToggle}
        disabled={!isConfigured || (!isAvailable && Boolean(message))}
        aria-pressed={isPlaying}
      >
        <span className="music-control__pill">{isPlaying ? "On" : "Off"}</span>
        <span>{isPlaying ? `Mute ${controlLabel}` : `Play ${controlLabel}`}</span>
      </button>

      {message ? <p className="music-control__hint">{message}</p> : null}
    </div>
  );
}
