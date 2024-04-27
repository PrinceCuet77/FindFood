import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'

import MainNavigation from '../MainNavigation'
import Wrapper from '../Wrapper'

import 'react-toastify/dist/ReactToastify.css'

const RootPage = () => {
  return (
    <Wrapper>
      <MainNavigation />
      <main className='h-full'>
        <ToastContainer className='w-[380px]' />
        <Outlet />
      </main>
    </Wrapper>
  )
}

export default RootPage
