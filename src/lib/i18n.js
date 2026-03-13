export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "es"];
export const LANGUAGE_STORAGE_KEY = "camilo-megz-language";

export function createLocalizedText(en = "", es = "") {
  return {
    en,
    es: es || en
  };
}

export function isLocalizedText(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value) && ("en" in value || "es" in value);
}

export function normalizeLocalizedText(value, fallback = createLocalizedText("")) {
  const fallbackValue = isLocalizedText(fallback)
    ? fallback
    : createLocalizedText(typeof fallback === "string" ? fallback : "");

  if (isLocalizedText(value)) {
    return {
      en: typeof value.en === "string" ? value.en : fallbackValue.en,
      es:
        typeof value.es === "string"
          ? value.es
          : typeof value.en === "string"
            ? value.en
            : fallbackValue.es || fallbackValue.en
    };
  }

  if (typeof value === "string") {
    return {
      en: value,
      es: fallbackValue.es || value
    };
  }

  return fallbackValue;
}

export function getLocalizedText(value, language = DEFAULT_LANGUAGE) {
  if (typeof value === "string") {
    return value;
  }

  if (isLocalizedText(value)) {
    return value[language] || value.en || value.es || "";
  }

  return "";
}

function localizePhoto(photo, language) {
  return {
    ...photo,
    alt: getLocalizedText(photo.alt, language),
    title: getLocalizedText(photo.title, language),
    caption: getLocalizedText(photo.caption, language),
    location: getLocalizedText(photo.location, language),
    note: getLocalizedText(photo.note, language)
  };
}

function localizeSection(section, language) {
  return {
    ...section,
    label: getLocalizedText(section.label, language),
    title: getLocalizedText(section.title, language),
    subtitle: getLocalizedText(section.subtitle, language),
    photos: section.photos.map((photo) => localizePhoto(photo, language))
  };
}

export function localizeAlbum(album, language = DEFAULT_LANGUAGE) {
  return {
    ...album,
    title: getLocalizedText(album.title, language),
    subtitle: getLocalizedText(album.subtitle, language),
    location: getLocalizedText(album.location, language),
    yearsLabel: getLocalizedText(album.yearsLabel, language),
    story: getLocalizedText(album.story ?? album.yearsLabel, language),
    daysLabel: getLocalizedText(album.daysLabel, language),
    momentsLabel: getLocalizedText(album.momentsLabel, language),
    intro: getLocalizedText(album.intro, language),
    updateNote: getLocalizedText(album.updateNote, language),
    audio: {
      ...album.audio,
      label: getLocalizedText(album.audio?.label, language)
    },
    days: album.days.map((day) => localizeSection(day, language)),
    extras: localizeSection(album.extras, language)
  };
}

export const UI_COPY = {
  en: {
    heroEyebrow: "Puerto Rico 2026",
    languageLabel: "Language",
    languageToggle: {
      en: "EN",
      es: "ES"
    },
    hero: {
      locationLabel: "Location",
      storyLabel: "Story",
      daysLabel: "Days",
      momentsLabel: "Moments"
    },
    loading: {
      eyebrow: "Opening Puerto Rico",
      text: "Gathering the chapters of the trip."
    },
    error: {
      eyebrow: "Album data unavailable",
      footer: "Check /data/album.json and try again."
    },
    day: {
      swipeHint: "Swipe through"
    },
    music: {
      on: "ON",
      off: "OFF",
      playPrefix: "Play",
      mutePrefix: "Mute",
      ready: "Soundtrack ready",
      missing: "Add a track in /audio or update album.json"
    },
    placeholder: {
      followup: "Add the matching image to continue this chapter."
    },
    print: {
      eyebrow: "Print keepsakes",
      title: "When the favorites are ready, send them to print.",
      body: "Open Walgreens Photo in a new tab when you're ready to turn the trip into prints.",
      button: "Open Walgreens Photo"
    }
  },
  es: {
    heroEyebrow: "Puerto Rico 2026",
    languageLabel: "Idioma",
    languageToggle: {
      en: "EN",
      es: "ES"
    },
    hero: {
      locationLabel: "Lugar",
      storyLabel: "Historia",
      daysLabel: "Días",
      momentsLabel: "Momentos"
    },
    loading: {
      eyebrow: "Abriendo el álbum",
      text: "Reuniendo los capítulos del viaje."
    },
    error: {
      eyebrow: "No se pudo abrir el álbum",
      footer: "Revisa /data/album.json e inténtalo de nuevo."
    },
    day: {
      swipeHint: "Desliza"
    },
    music: {
      on: "SÍ",
      off: "NO",
      playPrefix: "Escuchar",
      mutePrefix: "Silenciar",
      ready: "Banda sonora lista",
      missing: "Agrega una pista en /audio o actualiza album.json"
    },
    placeholder: {
      followup: ""
    },
    print: {
      eyebrow: "Recuerdos impresos",
      title: "Cuando las favoritas estén listas, es momento de imprimirlas.",
      body: "Abre Walgreens Photo en una pestaña nueva cuando quieras convertir el viaje en recuerdos impresos.",
      button: "Abrir Walgreens Photo"
    }
  }
};
