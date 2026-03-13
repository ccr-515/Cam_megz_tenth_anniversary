import { useEffect, useState } from "react";
import { createLocalizedText, normalizeLocalizedText } from "../lib/i18n";

const DAY_IDS = Array.from({ length: 7 }, (_, index) => `day-${String(index + 1).padStart(2, "0")}`);

function createPhotoSlot(sectionId, slotNumber, prefix = "photo") {
  const paddedSlot = String(slotNumber).padStart(2, "0");
  const fileName = prefix === "extra" ? `extra-${paddedSlot}.jpg` : `photo-${paddedSlot}.jpg`;

  return {
    id: `${sectionId}-${prefix}-${paddedSlot}`,
    src: `content/${sectionId}/${fileName}`,
    alt: createLocalizedText(
      `Add alt text for ${sectionId} ${prefix} ${paddedSlot}`,
      `Agrega texto alternativo para ${sectionId} ${prefix} ${paddedSlot}`
    ),
    title: createLocalizedText(`Slot ${paddedSlot}`, `Espacio ${paddedSlot}`),
    caption: createLocalizedText(
      "Replace this caption in data/album.json when the real photo is ready.",
      "Reemplaza este pie de foto en data/album.json cuando la imagen real esté lista."
    ),
    location: createLocalizedText(""),
    note: createLocalizedText(
      "Replace the file or update this path later.",
      "Reemplaza el archivo o actualiza esta ruta más adelante."
    )
  };
}

function createSection(sectionId, label, title, prefix = "photo") {
  return {
    id: sectionId,
    label,
    title,
    subtitle: createLocalizedText(
      "Edit this section title, subtitle, and captions in data/album.json.",
      "Edita el título, subtítulo y pies de foto de esta sección en data/album.json."
    ),
    photos: Array.from({ length: 3 }, (_, index) => createPhotoSlot(sectionId, index + 1, prefix))
  };
}

const DEFAULT_ALBUM = {
  title: createLocalizedText("Camilo & Megz 10 Year Anniversary", "10 Años de Camilo & Megz"),
  subtitle: createLocalizedText(
    "Seven days, shoreline light, tropical color, and enough room to swap in the real story whenever the album is ready.",
    "Siete días, luz de costa, color tropical y espacio suficiente para cambiar la historia real cuando el álbum esté listo."
  ),
  location: createLocalizedText("Puerto Rico"),
  yearsLabel: createLocalizedText("10 years together", "10 años juntos"),
  story: createLocalizedText("10 years together", "10 años juntos"),
  daysLabel: createLocalizedText("7"),
  momentsLabel: createLocalizedText("24"),
  intro: createLocalizedText(
    "Drop images into the existing day folders, then update titles and captions in data/album.json. Each day starts with three wired slots and an extras section at the end.",
    "Agrega las imágenes a las carpetas de cada día y luego actualiza los títulos y pies de foto en data/album.json. Cada día empieza con tres espacios y una sección extra al final."
  ),
  updateNote: createLocalizedText(
    "Replace images inside the existing folders, then edit titles, captions, alt text, and music in /data/album.json.",
    "Reemplaza las imágenes dentro de las carpetas existentes y luego edita títulos, pies de foto, texto alternativo y música en /data/album.json."
  ),
  printUrl: "https://photo.walgreens.com/store/home",
  audio: {
    src: "/audio/gotas-de-lluvia.mp3",
    label: createLocalizedText("Background music", "Música de fondo")
  },
  days: DAY_IDS.map((dayId, index) =>
    createSection(
      dayId,
      createLocalizedText(`Day ${String(index + 1).padStart(2, "0")}`, `Día ${String(index + 1).padStart(2, "0")}`),
      createLocalizedText(`Day ${String(index + 1).padStart(2, "0")}`, `Día ${String(index + 1).padStart(2, "0")}`)
    )
  ),
  extras: createSection(
    "extras",
    createLocalizedText("Extras"),
    createLocalizedText("Extras"),
    "extra"
  )
};

function normalizePhoto(photo, sectionId, slotNumber, prefix = "photo") {
  const starter = createPhotoSlot(sectionId, slotNumber, prefix);

  return {
    id: photo?.id || starter.id,
    src: typeof photo?.src === "string" ? photo.src : starter.src,
    alt: normalizeLocalizedText(photo?.alt, starter.alt),
    title: normalizeLocalizedText(photo?.title, starter.title),
    caption: normalizeLocalizedText(photo?.caption, starter.caption),
    location: normalizeLocalizedText(photo?.location, starter.location),
    note: normalizeLocalizedText(photo?.note, starter.note)
  };
}

function normalizeSection(section, fallback, prefix = "photo") {
  const sourcePhotos = Array.isArray(section?.photos) ? section.photos : fallback.photos;

  return {
    id: typeof section?.id === "string" ? section.id : fallback.id,
    label: normalizeLocalizedText(section?.label, fallback.label),
    title: normalizeLocalizedText(section?.title, fallback.title),
    subtitle: normalizeLocalizedText(section?.subtitle, fallback.subtitle),
    photos: Array.from({ length: 3 }, (_, index) =>
      normalizePhoto(sourcePhotos[index], fallback.id, index + 1, prefix)
    )
  };
}

function normalizeAlbum(payload) {
  const sourceDays = Array.isArray(payload?.days) ? payload.days : [];

  return {
    title: normalizeLocalizedText(payload?.title, DEFAULT_ALBUM.title),
    subtitle: normalizeLocalizedText(payload?.subtitle, DEFAULT_ALBUM.subtitle),
    location: normalizeLocalizedText(payload?.location, DEFAULT_ALBUM.location),
    yearsLabel: normalizeLocalizedText(payload?.yearsLabel, DEFAULT_ALBUM.yearsLabel),
    story: normalizeLocalizedText(payload?.story ?? payload?.yearsLabel, DEFAULT_ALBUM.story),
    daysLabel: normalizeLocalizedText(payload?.daysLabel, DEFAULT_ALBUM.daysLabel),
    momentsLabel: normalizeLocalizedText(payload?.momentsLabel, DEFAULT_ALBUM.momentsLabel),
    intro: normalizeLocalizedText(payload?.intro, DEFAULT_ALBUM.intro),
    updateNote: normalizeLocalizedText(payload?.updateNote, DEFAULT_ALBUM.updateNote),
    printUrl: typeof payload?.printUrl === "string" ? payload.printUrl : DEFAULT_ALBUM.printUrl,
    audio: {
      src:
        typeof payload?.audio?.src === "string" ? payload.audio.src : DEFAULT_ALBUM.audio.src,
      label: normalizeLocalizedText(payload?.audio?.label, DEFAULT_ALBUM.audio.label)
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
