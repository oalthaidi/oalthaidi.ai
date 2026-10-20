# 0007. Investor tour hidden behind `#tour`

- Status: Accepted
- Date: 2026-10-20

## Context
The guided tour explains the business to investors. Normal visitors should not see a "demo tour" button on a live professional site.

## Decision
The tour and its header button appear only when the home page is opened with `#tour` (for example `/#tour` or `/en#tour`). The mode is remembered for the browser tab so in-page links do not switch it off.

## Consequences
- One codebase serves both the public site and investor demos.
- Share `https://oalthaidi.com/#tour` with investors.
