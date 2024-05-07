import useAppRoot from '@pkg/hooks/useAppRoot'
import { Fragment, ReactNode } from 'react'
import Banner from './Banner'
import Footer from './Footer'
import Header from './Header'
import Popup from './Popup'

const routes = {
  // Header & Footer will be hidden
  bare: [],

  // Redirect to index.tsx if user is logged.
  guest: [],

  // Redirect to index.tsx if user isn't logged
  private: ['/account'],
}

export default function AppRoot({ children }: { children: ReactNode }) {
  const { isBareRoute } = useAppRoot({ routes })

  return (
    <Fragment>
      <div className='fixed inset-x-0 z-20'>
        <Banner />
        {!isBareRoute && <Header />}
      </div>
      {children}
      {!isBareRoute && <Footer />}
      <Popup />
    </Fragment>
  )
}
