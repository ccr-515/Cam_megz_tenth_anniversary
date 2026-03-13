export function PrintSection({ url }) {
  return (
    <section className="print-panel">
      <div className="print-panel__copy">
        <p className="print-panel__eyebrow">Print keepsakes</p>
        <h2>When the favorites are ready, send them to print.</h2>
        <p>Open Walgreens Photo in a new tab when you're ready to turn the trip into prints.</p>
      </div>

      <a className="print-panel__button" href={url} target="_blank" rel="noreferrer">
        Open Walgreens Photo
      </a>
    </section>
  );
}
