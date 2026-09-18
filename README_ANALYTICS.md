# Measuring the landing page

What the site records, what you have to switch on in GA4 before you can see it, and
where to look. Ids and event names live in `lib/analytics.ts`.

## What fires

| Event | Where | Fires | Answers |
|---|---|---|---|
| `page_view` | GA4, automatic | every page load | traffic, source, device, geo |
| `cta_click` | `app/layout.tsx` listener | **every** click on a link into `app.bigheadbuilder.com` | which CTA gets pressed |
| `section_view` | `components/SectionTracking.tsx` | first time a section scrolls into view | how far down people get |
| `conversion` | `app/layout.tsx` listener | **once per page load**, first click into the builder | Google Ads click-through |
| `PageView` | Meta pixel | every page load | Meta attribution + audiences |

`cta_click` carries `cta_location` (the `data-cta` on the link) and `link_url`.
`section_view` carries `section_name` (the `data-section` on the section).

The two click events deliberately disagree about counting. `cta_click` counts every
press, because a CTA pressed twice is a CTA doing its job. The Ads `conversion` counts
once, because Google is being asked "did this visitor cross over" and a double-tap is
not two visitors.

### Current tags

CTAs: `hero`, `nav`, `nav-find-order`, `page-header`, `intro`, `how-it-works`,
`not-a-head`, `final-cta`, `build-redirect`.

Sections: `hero`, `intro`, `gallery`, `not-a-head`, `how-it-works`, `referral`,
`testimonials`, `final-cta`, `faq`.

A CTA that ships without `data-cta` still counts — it just lands under `untagged`,
which is the signal to come back and name it. `BuildButton` requires the prop, so the
usual way of adding a CTA cannot forget it.

## One-time GA4 setup (required)

Custom event parameters are dropped from GA4's standard reports until they are
registered. Until you do this, `cta_location` and `section_name` appear **only** in
Realtime and DebugView.

**Admin → Data display → Custom definitions → Create custom dimension**, twice:

| Dimension name | Scope | Event parameter |
|---|---|---|
| `CTA location` | Event | `cta_location` |
| `Section name` | Event | `section_name` |

Registration is **not retroactive** — it applies from the moment you create it, so do
it before you care about the numbers. Allow 24-48h before the data shows in reports.

## Where to look

**Did it work at all?** Reports → Realtime, open the site, click a CTA. You should see
`cta_click` within seconds. For detail, use Admin → DebugView with the GA Debugger
Chrome extension on — it shows each event with its parameters expanded.

**Which CTA wins?** Explore → blank Free-form exploration. Drop `CTA location` into
Rows, `Event count` into Values, filter to `Event name` = `cta_click`. That is the
ranked list. Segment by Device category to see whether the sticky nav carries mobile
while the hero carries desktop — that split is usually the whole story.

**How far down do people get?** Same exploration, `Section name` in Rows, filter
`Event name` = `section_view`. Read every row as a percentage of `hero`, which
everyone sees. The first big drop is where the page is losing people. For a stricter
view, Explore → Funnel exploration with a step per section in page order.

**Time on page?** Reports → Engagement → Pages and screens, "Average engagement time".
This is time with the tab focused, not wall-clock, so it reads lower than you expect
and that is correct.

**Is the landing page actually producing orders?** Reports → Engagement → Landing page,
then add Conversions / Purchases. Because the builder is a subdomain sharing the `_ga`
cookie, sessions carry across and orders attribute back to the landing page without
cross-domain configuration.

**Ad spend view:** Google Ads → Goals → Conversions. The click-through action should be
listed **Secondary** (observed, not bid on). If it ever gets promoted to Primary,
bidding optimises for people clicking a button rather than buying a head.

## What is still not measured

Real heatmaps — cursor position, rage clicks, session replay — need a third-party tool
(Clarity, Hotjar, PostHog). None is installed. `section_view` is the honest substitute:
it tells you where people stop, but not what they hovered over on the way. Adding one
means a new entry in the privacy policy's Cookies & advertising section, so it is a
decision to make deliberately rather than a script to paste in.
