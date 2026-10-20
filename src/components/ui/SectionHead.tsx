interface SectionHeadProps {
  eyebrow: string;
  title: string;
  intro?: string;
  /** id of the heading, referenced by the section's aria-labelledby. */
  id: string;
}

/** Eyebrow + title + optional intro used at the top of every home section. */
export function SectionHead({ eyebrow, title, intro, id }: SectionHeadProps) {
  return (
    <div className="section-head" data-reveal="">
      <span className="section-head__eyebrow mono">{eyebrow}</span>
      <h2 className="section-head__title" id={id}>
        {title}
      </h2>
      {intro ? <p className="section-head__intro">{intro}</p> : null}
    </div>
  );
}
