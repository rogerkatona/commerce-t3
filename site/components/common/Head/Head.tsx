import type { VFC } from 'react'
import { SEO } from '@components/common'

const Head: VFC = () => {
  return (
    <SEO>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue"
        rel="stylesheet"
      />
    </SEO>
  )
}

export default Head
