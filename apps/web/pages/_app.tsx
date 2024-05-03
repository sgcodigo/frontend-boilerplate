import Provider from '@pkg/components/Provider'
import AppRoot from 'layouts/AppRoot'
import type { AppProps } from 'next/app'
import { Manrope, Noto_Serif } from 'next/font/google'
import 'styles/index.css'

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const serif = Noto_Serif({ subsets: ['latin'], variable: '--font-serif', display: 'swap' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider className='' fontVariables={{ sans: sans.variable, serif: serif.variable }}>
      <AppRoot>
        <Component {...pageProps} />
      </AppRoot>
    </Provider>
  )
}
