import Image from "next/image";
import Link from "next/link";
import { CourseIcon } from "@/components/ui/CourseIcon";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/paths";
import type { Course, SiteContent } from "@/content/types";
import { formatDate } from "@/lib/format";

export function Programs({ locale, programs }: { locale: Locale; programs: SiteContent["programs"] }) {
  return (
    <section className="section" id="programs" aria-labelledby="programs-title">
      <div className="wrap">
        <SectionHead id="programs-title" eyebrow={programs.eyebrow} title={programs.title} intro={programs.intro} />
        <div className="courses">
          {programs.courses.map((course) => (
            <CourseCard key={course.slug} course={course} locale={locale} programs={programs} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course, locale, programs }: { course: Course; locale: Locale; programs: SiteContent["programs"] }) {
  const href = localePath(locale, `/programs/${course.slug}`);
  const upcoming = course.sessions.filter((session) => new Date(session.startsAt) > new Date());
  const firstRegister = upcoming[0]?.registerUrl;

  return (
    <article className="course-card" data-tilt="" data-reveal="">
      <div className="course-card__top">
        <span className="tag">{course.audience}</span>
        <CourseIcon name={course.icon} />
      </div>
      {course.image ? (
        <Image
          className="course-card__cover"
          src={course.image.src}
          alt={course.image.alt}
          width={1200}
          height={1200}
          sizes="(max-width: 760px) 100vw, 560px"
        />
      ) : null}
      <h3 className="course-card__title">
        <Link href={href}>{course.title}</Link>
      </h3>
      <p className="course-card__summary">{course.summary}</p>
      <ul className="pill-list">
        {course.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="course-card__foot">
        <span className="course-card__next">
          {upcoming.length > 0 ? (
            <>
              {programs.nextLabel}{" "}
              {upcoming.map((session, index) => (
                <span key={session.startsAt}>
                  {index > 0 ? ` ${programs.andLabel} ` : ""}
                  <b>
                    <time dateTime={session.startsAt}>{formatDate(session.startsAt, locale, false)}</time>
                  </b>
                </span>
              ))}
            </>
          ) : (
            course.availability
          )}
        </span>
        {firstRegister ? (
          <a className="course-card__link" href={firstRegister} target="_blank" rel="noopener noreferrer">
            {programs.registerCta} ↗
          </a>
        ) : (
          <Link className="course-card__link" href={href}>
            {programs.detailsCta} <span className="arrow" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
