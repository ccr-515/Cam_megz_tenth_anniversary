export function LanguageToggle({ language, onChange, label, options }) {
  return (
    <div className="language-toggle" role="group" aria-label={label}>
      <button
        className={`language-toggle__button${language === "en" ? " language-toggle__button--active" : ""}`}
        type="button"
        onClick={() => onChange("en")}
        aria-pressed={language === "en"}
      >
        {options.en}
      </button>
      <span className="language-toggle__divider" aria-hidden="true">
        |
      </span>
      <button
        className={`language-toggle__button${language === "es" ? " language-toggle__button--active" : ""}`}
        type="button"
        onClick={() => onChange("es")}
        aria-pressed={language === "es"}
      >
        {options.es}
      </button>
    </div>
  );
}
