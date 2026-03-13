export function PrintSection({ url, copy }) {
  return (
    <section className="print-panel">
      <div className="print-panel__copy">
        <p className="print-panel__eyebrow">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </div>

      <a className="print-panel__button" href={url} target="_blank" rel="noreferrer">
        {copy.button}
      </a>
    </section>
  );
}
