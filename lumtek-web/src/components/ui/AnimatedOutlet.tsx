import { Outlet } from 'react-router-dom'
import { PageTransition } from './PageTransition'

export const AnimatedOutlet = () => (
  <PageTransition>
    <Outlet />
  </PageTransition>
)
