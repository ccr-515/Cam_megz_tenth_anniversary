import { useEffect, useMemo, useRef, useState } from "react";
import { toAssetUrl } from "../lib/assetPaths";

export function useBackgroundAudio(trackPath) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState(trackPath ? "loading" : "missing");

  const sourceUrl = useMemo(() => toAssetUrl(trackPath), [trackPath]);

  useEffect(() => {
    if (!trackPath) {
      setStatus("missing");
      setIsPlaying(false);
      return undefined;
    }

    const audio = new Audio(sourceUrl);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.45;

    function handleCanPlay() {
      setStatus("ready");
    }

    function handleError() {
      setStatus("error");
      setIsPlaying(false);
    }

    function handlePause() {
      setIsPlaying(false);
    }

    function handlePlay() {
      setIsPlaying(true);
    }

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audioRef.current = null;
    };
  }, [sourceUrl, trackPath]);

  async function toggle() {
    const audio = audioRef.current;

    if (!audio || status === "missing" || status === "error") {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setStatus("error");
      }
      return;
    }

    audio.pause();
  }

  return {
    isPlaying,
    status,
    isAvailable: status === "ready" || isPlaying,
    isConfigured: Boolean(trackPath),
    toggle
  };
}
