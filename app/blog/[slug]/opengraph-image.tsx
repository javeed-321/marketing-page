import { ImageResponse } from 'next/og'

import { formatDate, getAuthorForPost, getPostBySlug } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Blog post cover'

// Colors are hard-coded rather than pulled from globals.css: Satori resolves no
// CSS variables, so these mirror the mauve/red/card tokens literally.
const INK = 'rgb(9, 9, 11)' // --color-mauve-950
const MUTED = 'rgb(120, 113, 104)' // --color-mauve-700
const BRAND = 'rgb(236, 91, 91)' // --color-red-500
const SURFACE = 'rgb(245, 243, 241)' // --color-card

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: SURFACE,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: BRAND }} />
          <div style={{ fontSize: 32, fontWeight: 600, color: INK }}>{siteConfig.name}</div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: post && post.title.length > 60 ? 56 : 68,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: INK,
          }}
        >
          {post?.title ?? siteConfig.blogTitle}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: MUTED }}>
          <div>{post ? `Written by ${getAuthorForPost(post).name}` : ''}</div>
          <div>{post ? formatDate(post.date) : ''}</div>
        </div>
      </div>
    ),
    size,
  )
}
