import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseIcon } from "@/components/ui/CourseIcon";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/config/site";
import { courseSlugs, getContent, getCourse } from "@/content";
import { isLocale } from "@/i18n/config";
import { alternateLanguages, homeAnchor, localePath } from "@/i18n/paths";
import { formatDate, formatTimeRange } from "@/lib/format";
import { socialMetadata } from "@/lib/seo";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return courseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const course = getCourse(locale, slug);
  if (!course) return {};
  const { meta } = getContent(locale);
  const path = localePath(locale, `/programs/${slug}`);
  return {
    title: course.title,
    description: course.summary,
    alternates: {
      canonical: path,
      languages: alternateLanguages(`/programs/${slug}`),
    },
    ...socialMetadata({
      locale,
      siteName: meta.personName,
      title: `${course.title} | ${meta.personName}`,
      description: course.summary,
      path,
      ...(course.image ? { image: { url: course.image.src, width: 1200, height: 1200 } } : {}),
    }),
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
          provider: { "@type": "Person", name: meta.personName, url: `${site.url}${localePath(locale)}` },
          ...(upcoming.length
            ? {
                hasCourseInstance: upcoming.map((session) => ({
                  "@type": "CourseInstance",
                  startDate: session.startsAt,
                  endDate: session.endsAt,
                  courseMode: session.mode,
                  url: session.registerUrl,
                })),
              }
            : {}),
        }}
      />
      <div className="wrap">
        <Link className="breadcrumb" href={homeAnchor(locale, "programs")}>
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

          <aside
            className={`course-page__aside${course.poster ? " course-page__aside--poster" : ""}`}
            aria-labelledby="dates-title"
          >
            {course.poster ? (
              <Image
                className="course-page__cover course-page__cover--poster"
                src={course.poster.src}
                alt={course.poster.alt}
                width={course.poster.width}
                height={course.poster.height}
                sizes="(max-width: 860px) 100vw, 420px"
                priority
              />
            ) : course.image ? (
              <Image
                className="course-page__cover"
                src={course.image.src}
                alt={course.image.alt}
                width={1200}
                height={1200}
                sizes="(max-width: 860px) 100vw, 420px"
                priority
              />
            ) : null}
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
                      <div className="session__mode">
                        {formatTimeRange(session.startsAt, session.endsAt, locale)} · {session.mode}
                      </div>
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
              <Link className="btn btn--sm" href={homeAnchor(locale, "contact")}>
                {programs.requestCta}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
