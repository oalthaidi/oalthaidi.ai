import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { isLocale } from "@/i18n/config";
import { socialMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { privacy, meta } = getContent(locale);
  const path = `/${locale}/privacy`;
  return {
    title: privacy.title,
    alternates: { canonical: path, languages: { ar: "/ar/privacy", en: "/en/privacy" } },
    ...socialMetadata({ locale, siteName: meta.personName, title: `${privacy.title} | ${meta.personName}`, description: meta.description, path }),
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { privacy } = getContent(locale);

  return (
    <article className="page">
      <div className="wrap">
        <h1 className="page__title">{privacy.title}</h1>
        <p className="muted">{privacy.updated}</p>
        <div className="prose">
          {privacy.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
