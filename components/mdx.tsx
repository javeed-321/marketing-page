import type { MDXComponents } from 'mdx/types'
import * as runtime from 'react/jsx-runtime'

import { siteConfig } from '@/lib/site'

/**
 * Renders a post body compiled by velite.
 *
 * `post.body` is neither Markdown nor HTML — velite compiles each `.mdx` file to
 * the *body* of a JavaScript function at build time. Calling it with
 * `react/jsx-runtime` returns the component.
 *
 * Bodies are plain MDX: headings, paragraphs, lists, tables, code fences, images,
 * and inline SVG, styled by Tailwind Typography's `prose` classes (themed to the
 * site's tokens in `app/globals.css`). The only element override is `a`.
 */
function getMDXComponent(code: string) {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

const defaultComponents: MDXComponents = {
  /**
   * Links come in three shapes, and only one of them is genuinely external.
   *
   * Internal links are authored as absolute site URLs so velite's
   * copyLinkedFiles leaves them alone (it resolves anything else against the
   * content directory and fails the build — see velite.config.ts). Strip the
   * origin back off here so they stay same-tab, client-side navigations rather
   * than full page loads to our own domain.
   */
  a: ({ href = '', children, ...props }) => {
    const internal = href.startsWith(siteConfig.url)
    const resolved = internal ? href.slice(siteConfig.url.length) || '/' : href
    const isExternal = resolved.startsWith('http')

    return (
      <a href={resolved} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {children}
      </a>
    )
  },
}

export function MDXContent({ code, components }: { code: string; components?: MDXComponents }) {
  const Component = getMDXComponent(code)
  // react-hooks/static-components flags components built during render because a
  // changing identity remounts the subtree. That does not apply here: this is a
  // server component, `code` is a build-time constant baked into the post record,
  // and evaluating it is the only way to turn compiled MDX back into React.
  // Hoisting is impossible — the component *is* the post.
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={{ ...defaultComponents, ...components }} />
}
