import assert from "node:assert/strict";
import { test } from "node:test";
import { SOCIAL_IMAGE, socialMetadata } from "../src/lib/seo";

test("social metadata uses the large 1200×630 card on every page", () => {
  const meta = socialMetadata({ locale: "en", siteName: "Site", title: "T", description: "D", path: "/en/x" });
  assert.equal(meta.openGraph.url, "/en/x");
  assert.equal(meta.openGraph.locale, "en_GB");
  assert.deepEqual(meta.openGraph.images[0], { ...SOCIAL_IMAGE, alt: "Site" });
  assert.equal(meta.twitter.card, "summary_large_image");
  assert.equal(SOCIAL_IMAGE.width / SOCIAL_IMAGE.height, 1200 / 630);
});
