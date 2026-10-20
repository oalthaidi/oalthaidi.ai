/**
 * 404 texts, kept in their own small module because the 404 page is a
 * client component and should not ship the whole site content to the browser.
 */
export const notFoundText = {
  ar: { title: "الصفحة غير موجودة", body: "ربما تغيّر الرابط أو حُذفت الصفحة.", home: "العودة إلى الرئيسية" },
  en: { title: "Page not found", body: "The link may have changed or the page was removed.", home: "Back to home" },
} as const;
