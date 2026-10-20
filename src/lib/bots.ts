/**
 * Detects the crawlers that build link previews in chat and social apps.
 * They should receive a page directly, not a redirect, so the preview card
 * appears when someone shares the bare domain.
 */
const LINK_PREVIEW_BOTS =
  /whatsapp|facebookexternalhit|facebookcatalog|meta-externalagent|twitterbot|linkedinbot|slackbot|telegrambot|discordbot|skypeuripreview|pinterest|applebot|googlebot|bingbot/i;

export function isLinkPreviewBot(userAgent: string | null | undefined): boolean {
  return !!userAgent && LINK_PREVIEW_BOTS.test(userAgent);
}
