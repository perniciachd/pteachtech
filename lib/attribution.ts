/**
 * First-touch marketing attribution.
 *
 * Answers "which LinkedIn post produced this lead?" — not just "how many people
 * visited". The visit and the conversion are usually days apart, so the campaign
 * that earned the click has to be remembered until the form is actually submitted.
 *
 * Design notes:
 *  - **First touch wins.** Once stored, we never overwrite. If someone arrives from
 *    post 4, leaves, and comes back a week later via Google, post 4 still gets the
 *    credit — it did the work. Last touch is captured separately for context.
 *  - **First-party only.** localStorage on our own origin, no cookies set for third
 *    parties, no external calls. Nothing here needs a consent banner that the site
 *    doesn't already need, but see /privacy if that changes.
 *  - **Never throws.** Storage is unavailable in Safari private mode and some
 *    embedded browsers (including LinkedIn's in-app browser, which is exactly the
 *    traffic we care about). Every access is guarded; failure degrades to "no
 *    attribution" rather than a broken form.
 */

const FIRST_TOUCH_KEY = 'ptt_attribution_first'
const LAST_TOUCH_KEY = 'ptt_attribution_last'

/** Cap every field so a crafted URL can't push a huge payload into our email. */
const MAX_FIELD = 200

export interface Attribution {
  source?: string
  medium?: string
  campaign?: string
  /** The per-post key. This is what distinguishes LinkedIn post 4 from post 7. */
  content?: string
  term?: string
  /** document.referrer at first touch — catches traffic with no UTMs. */
  referrer?: string
  /** Path the visitor first landed on. */
  landingPath?: string
  /** ISO date (day precision — we don't need the time, and it's less identifying). */
  firstTouchAt?: string
}

export interface AttributionPayload {
  first?: Attribution
  last?: Attribution
}

function truncate(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return trimmed.slice(0, MAX_FIELD)
}

function safeGet(key: string): Attribution | undefined {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return undefined
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? (parsed as Attribution) : undefined
  } catch {
    return undefined
  }
}

function safeSet(key: string, value: Attribution): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* private mode / storage disabled — attribution is best-effort */
  }
}

/**
 * Reads UTM params and referrer from the current URL.
 * Returns undefined when there is nothing worth recording, so that ordinary
 * internal navigation doesn't overwrite a real campaign touch with an empty one.
 */
function readCurrentTouch(): Attribution | undefined {
  if (typeof window === 'undefined') return undefined

  let params: URLSearchParams
  try {
    params = new URLSearchParams(window.location.search)
  } catch {
    return undefined
  }

  const source = truncate(params.get('utm_source'))
  const medium = truncate(params.get('utm_medium'))
  const campaign = truncate(params.get('utm_campaign'))
  const content = truncate(params.get('utm_content'))
  const term = truncate(params.get('utm_term'))

  // Ignore self-referrals — an internal page-to-page hop is not a new touch.
  let referrer = truncate(document.referrer)
  if (referrer) {
    try {
      if (new URL(referrer).hostname === window.location.hostname) referrer = undefined
    } catch {
      referrer = undefined
    }
  }

  const hasCampaign = Boolean(source || medium || campaign || content || term)
  if (!hasCampaign && !referrer) return undefined

  return {
    source,
    medium,
    campaign,
    content,
    term,
    referrer,
    landingPath: truncate(window.location.pathname),
    firstTouchAt: new Date().toISOString().slice(0, 10),
  }
}

/**
 * Records the current touch. Call once per page load.
 * First touch is written only when absent; last touch is always refreshed.
 */
export function captureAttribution(): void {
  const current = readCurrentTouch()
  if (!current) return

  if (!safeGet(FIRST_TOUCH_KEY)) safeSet(FIRST_TOUCH_KEY, current)
  safeSet(LAST_TOUCH_KEY, current)
}

/** Reads stored attribution for submission alongside a lead. */
export function getAttribution(): AttributionPayload | undefined {
  if (typeof window === 'undefined') return undefined
  const first = safeGet(FIRST_TOUCH_KEY)
  const last = safeGet(LAST_TOUCH_KEY)
  if (!first && !last) return undefined
  return { first, last }
}

/**
 * Appends the original campaign params to an outbound Cal.com URL.
 *
 * Without this the funnel dies at the domain boundary: the booking happens on
 * cal.com, so a call booked off post 4 would otherwise be indistinguishable from
 * one booked off a Google search.
 */
export function withAttributionParams(url: string): string {
  const attribution = getAttribution()
  const a = attribution?.first
  if (!a) return url

  try {
    const parsed = new URL(url)
    if (a.source) parsed.searchParams.set('utm_source', a.source)
    if (a.medium) parsed.searchParams.set('utm_medium', a.medium)
    if (a.campaign) parsed.searchParams.set('utm_campaign', a.campaign)
    if (a.content) parsed.searchParams.set('utm_content', a.content)
    return parsed.toString()
  } catch {
    return url
  }
}
