import { useEffect, useState } from "react";

const DAY_IDS = Array.from({ length: 7 }, (_, index) => `day-${String(index + 1).padStart(2, "0")}`);

function createPhotoSlot(sectionId, slotNumber, prefix = "photo") {
  const paddedSlot = String(slotNumber).padStart(2, "0");
  const fileName = prefix === "extra" ? `extra-${paddedSlot}.jpg` : `photo-${paddedSlot}.jpg`;

  return {
    id: `${sectionId}-${prefix}-${paddedSlot}`,
    src: `content/${sectionId}/${fileName}`,
    alt: `Add alt text for ${sectionId} ${prefix} ${paddedSlot}`,
    title: `Slot ${paddedSlot}`,
    caption: "Replace this caption in data/album.json when the real photo is ready.",
    location: "",
    note: "Replace the file or update this path later."
  };
}

function createSection(sectionId, label, title, prefix = "photo") {
  return {
    id: sectionId,
    label,
    title,
    subtitle: "Edit this section title, subtitle, and captions in data/album.json.",
    photos: Array.from({ length: 3 }, (_, index) => createPhotoSlot(sectionId, index + 1, prefix))
  };
}

const DEFAULT_ALBUM = {
  title: "Camilo & Megz 10 Year Anniversary",
  subtitle:
    "Seven days, shoreline light, tropical color, and enough room to swap in the real story whenever the album is ready.",
  location: "Puerto Rico",
  yearsLabel: "10 years together",
  intro:
    "Drop images into the existing day folders, then update titles and captions in data/album.json. Each day starts with three wired slots and an extras section at the end.",
  printUrl: "https://photo.walgreens.com/store/home",
  audio: {
    src: "audio/background-track.mp3",
    label: "Background music"
  },
  days: DAY_IDS.map((dayId, index) =>
    createSection(dayId, `Day ${String(index + 1).padStart(2, "0")}`, `Day ${String(index + 1).padStart(2, "0")}`)
  ),
  extras: createSection("extras", "Extras", "Extras", "extra")
};

function normalizePhoto(photo, sectionId, slotNumber, prefix = "photo") {
  const starter = createPhotoSlot(sectionId, slotNumber, prefix);

  return {
    id: photo?.id || starter.id,
    src: typeof photo?.src === "string" ? photo.src : starter.src,
    alt: typeof photo?.alt === "string" ? photo.alt : starter.alt,
    title: typeof photo?.title === "string" ? photo.title : starter.title,
    caption: typeof photo?.caption === "string" ? photo.caption : starter.caption,
    location: typeof photo?.location === "string" ? photo.location : starter.location,
    note: typeof photo?.note === "string" ? photo.note : starter.note
  };
}

function normalizeSection(section, fallback, prefix = "photo") {
  const sourcePhotos = Array.isArray(section?.photos) ? section.photos : fallback.photos;

  return {
    id: typeof section?.id === "string" ? section.id : fallback.id,
    label: typeof section?.label === "string" ? section.label : fallback.label,
    title: typeof section?.title === "string" ? section.title : fallback.title,
    subtitle: typeof section?.subtitle === "string" ? section.subtitle : fallback.subtitle,
    photos: Array.from({ length: 3 }, (_, index) =>
      normalizePhoto(sourcePhotos[index], fallback.id, index + 1, prefix)
    )
  };
}

function normalizeAlbum(payload) {
  const sourceDays = Array.isArray(payload?.days) ? payload.days : [];

  return {
    title: typeof payload?.title === "string" ? payload.title : DEFAULT_ALBUM.title,
    subtitle: typeof payload?.subtitle === "string" ? payload.subtitle : DEFAULT_ALBUM.subtitle,
    location: typeof payload?.location === "string" ? payload.location : DEFAULT_ALBUM.location,
    yearsLabel:
      typeof payload?.yearsLabel === "string" ? payload.yearsLabel : DEFAULT_ALBUM.yearsLabel,
    intro: typeof payload?.intro === "string" ? payload.intro : DEFAULT_ALBUM.intro,
    printUrl: typeof payload?.printUrl === "string" ? payload.printUrl : DEFAULT_ALBUM.printUrl,
    audio: {
      src:
        typeof payload?.audio?.src === "string" ? payload.audio.src : DEFAULT_ALBUM.audio.src,
      label:
        typeof payload?.audio?.label === "string" ? payload.audio.label : DEFAULT_ALBUM.audio.label
    },
    days: DEFAULT_ALBUM.days.map((fallbackDay, index) =>
      normalizeSection(sourceDays[index], fallbackDay)
    ),
    extras: normalizeSection(payload?.extras, DEFAULT_ALBUM.extras, "extra")
  };
}

export function useAlbumData() {
  const [state, setState] = useState({
    album: DEFAULT_ALBUM,
    loading: true,
    error: ""
  });

  useEffect(() => {
    let isMounted = true;

    async function loadAlbum() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/album.json`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`);
        }

        const payload = await response.json();

        if (isMounted) {
          setState({
            album: normalizeAlbum(payload),
            loading: false,
            error: ""
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            album: DEFAULT_ALBUM,
            loading: false,
            error: error instanceof Error ? error.message : "Unable to load data/album.json."
          });
        }
      }
    }

    loadAlbum();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
