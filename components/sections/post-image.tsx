import Image from 'next/image'

/**
 * Inline article screenshot — custom component.
 *
 * Screenshots are a first-class element of a documentation.ai post, not a
 * decoration: nearly every H3 in a comparison article is followed by one.
 *
 * `elements/screenshot.tsx` is the marketing-page treatment — it wraps art in a
 * coloured `Wallpaper` and bleeds it off one edge, which is right for a hero and
 * wrong inside body copy. This is the flat article version: full column width,
 * rounded, one hairline border, optional caption.
 */
export function PostImage({
  src,
  alt,
  width = 960,
  height = 540,
  caption,
}: {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
}) {
  return (
    <figure className="flex flex-col gap-3">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full rounded-xl border border-card-border bg-card dark:border-white/10"
      />
      {caption && <figcaption className="text-sm/6 text-mauve-500">{caption}</figcaption>}
    </figure>
  )
}
