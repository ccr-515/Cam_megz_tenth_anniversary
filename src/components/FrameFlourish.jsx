export function FrameFlourish({ layer = "under" }) {
  if (layer === "under") {
    return (
      <div className="frame-flourish frame-flourish--under" aria-hidden="true">
        <span className="frame-flourish__halo" />
        <span className="frame-flourish__shadow frame-flourish__shadow--top-left" />
        <span className="frame-flourish__shadow frame-flourish__shadow--bottom-right" />
        <span className="frame-flourish__vine frame-flourish__vine--under-top-left" />
        <span className="frame-flourish__vine frame-flourish__vine--under-bottom-right" />
        <span className="frame-flourish__leaf frame-flourish__leaf--under-left" />
        <span className="frame-flourish__leaf frame-flourish__leaf--under-right" />
      </div>
    );
  }

  return (
    <div className="frame-flourish frame-flourish--over" aria-hidden="true">
      <span className="frame-flourish__ribbon frame-flourish__ribbon--top" />
      <span className="frame-flourish__ribbon frame-flourish__ribbon--bottom" />
      <span className="frame-flourish__vine frame-flourish__vine--over-top-right" />
      <span className="frame-flourish__vine frame-flourish__vine--over-bottom-left" />
      <span className="frame-flourish__leaf frame-flourish__leaf--over-top-right" />
      <span className="frame-flourish__leaf frame-flourish__leaf--over-bottom-left" />
      <span className="frame-flourish__flower frame-flourish__flower--top-right" />
      <span className="frame-flourish__flower frame-flourish__flower--bottom-left" />
      <span className="frame-flourish__flower frame-flourish__flower--mid-right" />
      <span className="frame-flourish__stamp">
        <span className="frame-flourish__stamp-stripe frame-flourish__stamp-stripe--red" />
        <span className="frame-flourish__stamp-stripe frame-flourish__stamp-stripe--sand" />
        <span className="frame-flourish__stamp-stripe frame-flourish__stamp-stripe--blue" />
      </span>
    </div>
  );
}
