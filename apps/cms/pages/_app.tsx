import Provider from '@pkg/components/Provider'
import AppRoot from 'layouts/AppRoot'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import 'styles/index.css'

const sans = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi.ttf',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Italic.ttf',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-sans',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider className='' fontVariables={{ sans: sans.variable }}>
      <AppRoot>
        <Component {...pageProps} />
      </AppRoot>
    </Provider>
  )
}
