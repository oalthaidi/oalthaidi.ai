import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseIcon } from "@/components/ui/CourseIcon";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/config/site";
import { courseSlugs, getContent, getCourse } from "@/content";
import { isLocale } from "@/i18n/config";
import { formatDate } from "@/lib/format";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return courseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const course = getCourse(locale, slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.summary,
    alternates: {
      canonical: `/${locale}/programs/${slug}`,
      languages: { ar: `/ar/programs/${slug}`, en: `/en/programs/${slug}` },
    },
  };
}

/** Programme detail page: topics, outcomes, format and upcoming dates. */
export default async function CoursePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const course = getCourse(locale, slug);
  if (!course) notFound();
  const { programs, meta } = getContent(locale);
  const upcoming = course.sessions.filter((session) => new Date(session.startsAt) > new Date());

  return (
    <article className="page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.summary,
          inLanguage: locale,
          provider: { "@type": "Person", name: meta.personName, url: `${site.url}/${locale}` },
          ...(upcoming.length
            ? {
                hasCourseInstance: upcoming.map((session) => ({
                  "@type": "CourseInstance",
                  startDate: session.startsAt,
                  courseMode: session.mode,
                  url: session.registerUrl,
                })),
              }
            : {}),
        }}
      />
      <div className="wrap">
        <Link className="breadcrumb" href={`/${locale}#programs`}>
          {programs.page.back}
        </Link>
        <div className="course-card__top" style={{ maxWidth: 720 }}>
          <span className="tag">{course.audience}</span>
          <CourseIcon name={course.icon} />
        </div>
        <h1 className="page__title">{course.title}</h1>
        <p className="page__lead">{course.summary}</p>

        <div className="course-page">
          <div className="course-page__main">
            <section aria-labelledby="topics-title">
              <h2 className="course-page__heading" id="topics-title">
                {programs.page.topics}
              </h2>
              <ul className="check-list">
                {course.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="outcomes-title">
              <h2 className="course-page__heading" id="outcomes-title">
                {programs.page.outcomes}
              </h2>
              <ul className="check-list">
                {course.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="course-page__aside" aria-labelledby="dates-title">
            <div>
              <span className="mono">{programs.page.format}</span>
              <p>{course.format}</p>
            </div>
            <div>
              <h2 className="course-page__heading" id="dates-title">
                {programs.page.upcoming}
              </h2>
              {upcoming.length ? (
                upcoming.map((session) => (
                  <div className="session" key={session.startsAt}>
                    <div>
                      <time className="session__date" dateTime={session.startsAt}>
                        {formatDate(session.startsAt, locale)}
                      </time>
                      <div className="session__mode">{session.mode}</div>
                    </div>
                    <a className="btn btn--sm btn--primary" href={session.registerUrl} target="_blank" rel="noopener noreferrer">
                      {programs.registerCta} ↗
                    </a>
                  </div>
                ))
              ) : (
                <p className="muted">{programs.page.noUpcoming}</p>
              )}
            </div>
            <div className="session">
              <div>
                <strong>{programs.page.ctaTitle}</strong>
                <p className="muted">{programs.page.ctaBody}</p>
              </div>
              <Link className="btn btn--sm" href={`/${locale}#contact`}>
                {programs.requestCta}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
