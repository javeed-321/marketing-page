import { clsx } from 'clsx/lite'
import Script from 'next/script'

/**
 * Cal.com inline booking widget.
 *
 * The loader below is Cal's own published snippet, copied unchanged from
 * documentation.ai/get-a-demo — it shims a `Cal()` queue, appends
 * `app.cal.com/embed/embed.js`, then replays the queued calls once that lands.
 * Do not "tidy" it; Cal's API expects exactly this shape.
 *
 * `theme: 'dark'` matches the live site: the widget renders as a dark panel on
 * the light page, so it does not follow this site's light-mode lock.
 *
 * This loads a third-party script from app.cal.com and hands it an element to
 * render into. Nothing else on the site does that — if a CSP is ever added,
 * `app.cal.com` has to be allowed for script-src and frame-src.
 */
export function CalBooking({
  calLink,
  namespace = 'demo',
  className,
}: {
  /** Cal booking path, e.g. "documentation.ai/demo". */
  calLink: string
  /** Cal embed namespace. Also the mount element's id suffix. */
  namespace?: string
  className?: string
}) {
  const elementId = `my-cal-inline-${namespace}`

  return (
    <>
      {/*
       * `flex justify-center` mirrors the live embed, whose host document sets
       * `body { display:flex; justify-content:center; align-items:center }`.
       * Without it, Cal's booking step — which is narrower than the month view —
       * sits flush left the moment a time is picked, instead of holding the
       * centre while the widget resizes around it.
       *
       * `items-start`, not `items-center`: this box scrolls, and centring the
       * cross axis puts the top of taller content above the scroll origin where
       * it cannot be reached.
       *
       * Height comes from `className` — the page owns it.
       */}
      <div id={elementId} className={clsx('flex w-full items-start justify-center', className)} />

      <Script id={`cal-embed-${namespace}`} strategy="afterInteractive">
        {`(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", ${JSON.stringify(namespace)}, {origin:"https://app.cal.com"});
Cal.ns[${JSON.stringify(namespace)}]("inline", {
  elementOrSelector: ${JSON.stringify(`#${elementId}`)},
  config: {"layout":"month_view","theme":"dark"},
  calLink: ${JSON.stringify(calLink)},
});
Cal.ns[${JSON.stringify(namespace)}]("ui", {"theme":"dark","hideEventTypeDetails":false,"layout":"month_view"});`}
      </Script>
    </>
  )
}
