'use client'

import { useRef } from 'react'

import type { CustomerLogo } from '@/components/site/trusted-by'

/** Playback rate while the pointer is over the marquee — it eases off, it doesn't stop. */
const HOVER_RATE = 0.35

export function LogoMarquee({ logos }: { logos: CustomerLogo[] }) {
  const trackRef = useRef<HTMLUListElement>(null)

  // Retiming through the Web Animations API instead of swapping the CSS duration:
  // updatePlaybackRate keeps the current position and glides to the new speed, whereas a
  // duration change would recompute progress from elapsed time and visibly jump the track.
  const setRate = (rate: number) => {
    for (const animation of trackRef.current?.getAnimations() ?? []) animation.updatePlaybackRate(rate)
  }

  return (
    <div
      onMouseEnter={() => setRate(HOVER_RATE)}
      onMouseLeave={() => setRate(1)}
      className="overflow-hidden py-2.5 mask-[linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]"
    >
      {/*
        The list is rendered twice and slid left by exactly one copy (half the track,
        minus half a gap), so the loop is seamless.
      */}
      <ul ref={trackRef} className="flex w-max animate-marquee items-center gap-10 motion-reduce:animate-none">
        {[...logos, ...logos].map((logo, i) => (
          <li
            key={i}
            className="flex h-14 w-45 shrink-0 items-center justify-center"
            // The second copy is a visual dupe — keep it out of the accessibility tree.
            aria-hidden={i >= logos.length || undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- fixed-width local asset, no responsive sizing needed */}
            <img src={logo.src} alt={`${logo.name} logo`} style={{ width: logo.width }} className="h-auto max-w-none opacity-80" />
          </li>
        ))}
      </ul>
    </div>
  )
}
