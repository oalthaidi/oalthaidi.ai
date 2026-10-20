import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CredentialsMarquee } from "@/components/sections/CredentialsMarquee";
import { Hero } from "@/components/sections/Hero";
import { Programs } from "@/components/sections/Programs";
import { Readiness } from "@/components/sections/Readiness";
import { Research } from "@/components/sections/Research";
import { Solutions } from "@/components/sections/Solutions";
import { GuidedTour } from "@/components/tour/GuidedTour";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/config/site";
import { getContent } from "@/content";
import { isLocale } from "@/i18n/config";
import { localePath } from "@/i18n/paths";

/** Home page: the sections in reading order. Sections alternate black / grey. */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: content.meta.personName,
          jobTitle: content.meta.jobTitle,
          url: `${site.url}${localePath(locale)}`,
          image: `${site.url}${site.portrait.src}`,
          email: `mailto:${site.email}`,
          telephone: site.phoneE164,
          address: { "@type": "PostalAddress", addressCountry: "KW" },
          alumniOf: { "@type": "CollegeOrUniversity", name: "Arizona State University" },
        }}
      />
      <Hero locale={locale} content={content} />
      <CredentialsMarquee items={content.credentials} label={content.credentialsLabel} />
      <About locale={locale} about={content.about} />
      <Programs locale={locale} programs={content.programs} />
      <Readiness locale={locale} readiness={content.readiness} />
      <Research research={content.research} />
      <Solutions solutions={content.solutions} />
      <Contact contact={content.contact} />
      <GuidedTour locale={locale} tour={content.tour} />
    </>
  );
}
