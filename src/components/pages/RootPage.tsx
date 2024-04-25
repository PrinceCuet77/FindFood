import { Outlet } from 'react-router-dom'

import MainNavigation from '../MainNavigation'
import Wrapper from '../Wrapper'

const RootPage = () => {
  return (
    <Wrapper>
      <MainNavigation />
      <main className='h-full'>
        <Outlet />
      </main>
    </Wrapper>
  )
}

export default RootPage
