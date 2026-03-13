export function LanguageToggle({ language, onChange, copy }) {
  const isEnglish = language === "en";
  const nextLanguage = isEnglish ? "es" : "en";
  const buttonText = isEnglish ? copy.switchToSpanish : copy.switchToEnglish;
  const ariaLabel = isEnglish ? copy.switchToSpanishAria : copy.switchToEnglishAria;

  return (
    <div className={`language-toggle language-toggle--${language}`}>
      <button
        className="language-toggle__button"
        type="button"
        onClick={() => onChange(nextLanguage)}
        aria-label={ariaLabel}
      >
        <span className="language-toggle__button-label">{buttonText}</span>
      </button>
    </div>
  );
}
