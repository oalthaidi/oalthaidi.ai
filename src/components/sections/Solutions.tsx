import { SectionHead } from "@/components/ui/SectionHead";
import type { SiteContent } from "@/content/types";

export function Solutions({ solutions }: { solutions: SiteContent["solutions"] }) {
  return (
    <section className="section section--alt" id="solutions" aria-labelledby="solutions-title">
      <div className="wrap">
        <SectionHead id="solutions-title" eyebrow={solutions.eyebrow} title={solutions.title} intro={solutions.intro} />
        <ol className="roadmap" data-reveal="">
          {solutions.phases.map((phase) => (
            <li className={`phase${phase.current ? " is-current" : ""}`} key={phase.label}>
              <div className="phase__head">
                <span className="mono">{phase.label}</span>
                <span className="phase__state">{phase.state}</span>
              </div>
              <h3 className="phase__title">{phase.title}</h3>
              <p className="phase__body">{phase.body}</p>
              <ul className="phase__items">
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="roadmap-note">{solutions.note}</p>
      </div>
    </section>
  );
}
