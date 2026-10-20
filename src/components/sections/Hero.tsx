import { AnimatedMark } from "@/components/brand/AnimatedMark";
import { DecodeText } from "@/components/motion/DecodeText";
import { NeuralField } from "@/components/motion/NeuralField";
import { NextSessionChip, type ChipSession } from "@/components/motion/NextSessionChip";
import { Rich } from "@/components/ui/Rich";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "@/content/types";
import { formatDate } from "@/lib/format";

interface HeroProps {
  locale: Locale;
  content: SiteContent;
}

export function Hero({ locale, content }: HeroProps) {
  const { hero } = content;
  const now = new Date();
  // Flatten all public sessions; the chip picks the nearest one on the client.
  const sessions: ChipSession[] = content.programs.courses.flatMap((course) =>
    course.sessions
      .filter((session) => new Date(session.startsAt) > now)
      .map((session) => ({
        startsAt: session.startsAt,
        courseTitle: course.title,
        mode: session.mode,
        dateLabel: formatDate(session.startsAt, locale, false),
      })),
  );

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <NeuralField />
      <div className="wrap hero__inner">
        <div className="hero__text">
          <NextSessionChip sessions={sessions} locale={locale} label={hero.nextSessionLabel} text={hero.countdown} />
          <h1 className="hero__title" id="hero-title">
            <span className="hero__prefix">{hero.prefix}</span> <DecodeText text={hero.name} />
          </h1>
          <p className="hero__role">
            <DecodeText text={hero.role} delayFrames={8} />
          </p>
          <p className="hero__lead">
            <Rich value={hero.lead} />
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#programs" data-magnetic="">
              {hero.primaryCta} <span className="arrow" aria-hidden="true" />
            </a>
            <a className="btn" href="#readiness" data-magnetic="">
              {hero.secondaryCta}
            </a>
          </div>
          <div className="scroll-hint mono" aria-hidden="true">
            <span className="scroll-hint__line" />
            {hero.scrollHint}
          </div>
        </div>
        <AnimatedMark caption={hero.markCaption} label={content.meta.personName} />
      </div>
    </section>
  );
}
