'use client'

import { useState } from 'react'

/**
 * A YouTube embed that shows nothing but a thumbnail and a play button until
 * it is clicked.
 *
 * YouTube paints its own poster state — title strip, share and watch-later
 * buttons, a "Watch on YouTube" badge — inside a cross-origin iframe. CSS
 * cannot reach it, and the parameters that once suppressed it are gone
 * (`showinfo` removed in 2018, `modestbranding` deprecated in 2023). The only
 * way to a clean poster is to never show YouTube's.
 *
 * So the thumbnail and the button below are ours, and the iframe is mounted
 * only on click, with `autoplay=1` — the first frame YouTube paints is
 * already-playing video, which carries no overlay. documentation.ai does the
 * same thing today; its iframe sits behind `display:none` until that click.
 *
 * It also keeps a comparison post from loading eight YouTube players before
 * anyone presses play.
 */
const PARAMS = 'autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3'
const ALLOW = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'

export function YouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="yt-embed">
      {playing ? (
        <iframe src={`https://www.youtube.com/embed/${id}?${PARAMS}`} title={title} allow={ALLOW} allowFullScreen />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          {/*
            Deliberately not next/image: i.ytimg.com would have to be added to
            remotePatterns, and these stills are already sized and cached by
            Google's CDN — running them through the optimiser buys nothing.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi_webp/${id}/sddefault.webp`} alt="" loading="lazy" />
          {/* YouTube's own play button geometry, redrawn. */}
          <svg viewBox="0 0 68 48" aria-hidden="true">
            <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" />
            <path d="M 45,24 27,14 27,34" fill="#fff" />
          </svg>
        </button>
      )}
    </div>
  )
}
