import assert from "node:assert/strict";
import { test } from "node:test";
import { isLinkPreviewBot } from "../src/lib/bots";
import { SOCIAL_IMAGE, socialMetadata } from "../src/lib/seo";

test("link-preview crawlers are recognised", () => {
  assert.equal(isLinkPreviewBot("WhatsApp/2.24.10.85 A"), true);
  assert.equal(isLinkPreviewBot("facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"), true);
  assert.equal(isLinkPreviewBot("LinkedInBot/1.0 (compatible; Mozilla/5.0)"), true);
  assert.equal(isLinkPreviewBot("Twitterbot/1.0"), true);
  assert.equal(isLinkPreviewBot("TelegramBot (like TwitterBot)"), true);
});

test("ordinary browsers are not treated as crawlers", () => {
  assert.equal(isLinkPreviewBot("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1"), false);
  assert.equal(isLinkPreviewBot(null), false);
  assert.equal(isLinkPreviewBot(""), false);
});

test("social metadata uses the large 1200×630 card on every page", () => {
  const meta = socialMetadata({ locale: "en", siteName: "Site", title: "T", description: "D", path: "/en/x" });
  assert.equal(meta.openGraph.url, "/en/x");
  assert.equal(meta.openGraph.locale, "en_GB");
  assert.deepEqual(meta.openGraph.images[0], { ...SOCIAL_IMAGE, alt: "Site" });
  assert.equal(meta.twitter.card, "summary_large_image");
  assert.equal(SOCIAL_IMAGE.width / SOCIAL_IMAGE.height, 1200 / 630);
});
