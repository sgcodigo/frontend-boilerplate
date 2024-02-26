import Head from 'next/head'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLElement> & { title?: string; keywords?: string; image?: string; description?: string }

export default function Page({ title = '', image, keywords = '', description, children, ...rest }: Props) {
  return (
    <main {...rest}>
      <Head>
        <title>{title}</title>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
        {image && <meta property='og:image' content={image} />}
      </Head>
      {children}
    </main>
  )
}

export type { Props as PageProps }
