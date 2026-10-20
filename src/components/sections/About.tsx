import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { SectionHead } from "@/components/ui/SectionHead";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "@/content/types";

export function About({ locale, about }: { locale: Locale; about: SiteContent["about"] }) {
  return (
    <section className="section section--alt" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead id="about-title" eyebrow={about.eyebrow} title={about.title} />
        <div className="about">
          <div className="id-card" data-reveal="">
            <div className="id-card__top">
              <Image
                className="id-card__photo"
                src={site.portrait.src}
                width={168}
                height={168}
                alt={about.card.photoAlt}
              />
              <div>
                <h3 className="id-card__name">{about.card.name}</h3>
                <p className="id-card__role">{about.card.role}</p>
              </div>
            </div>
            <dl className="id-card__rows">
              {about.card.rows.map((row) => (
                <div className="id-card__row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="about__text" data-reveal="">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="stats">
              {about.stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <CountUp value={stat.value} plus={stat.plus} locale={locale} />
                  <span className="stat__label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
