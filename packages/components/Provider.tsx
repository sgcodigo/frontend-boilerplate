import RecoilStatePortal from '@pkg/utils/recoil-portal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NextProgress from 'nextjs-progressbar'
import { HTMLProps } from 'react'
import { RecoilRoot } from 'recoil'

type Props = HTMLProps<HTMLDivElement> & {
  fontVariables: { sans: string; serif?: string }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function Provider({ children, className, fontVariables, ...rest }: Props) {
  return (
    // Note: `h-screen` is important for `position: sticky` elements.
    <div {...rest} className={`font-sans h-screen ${fontVariables.sans} ${fontVariables.serif} ${className}`}>
      <RecoilRoot>
        <RecoilStatePortal />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </RecoilRoot>
      <NextProgress color='#000' showOnShallow={false} options={{ showSpinner: false }} />
    </div>
  )
}
