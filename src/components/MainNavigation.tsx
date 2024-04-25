import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from './ui/button'
import Sidebar from './Sidebar'

const MainNavigation = () => {
  const [toggleMenu, setToggleMenu] = useState(true)

  const navigate = useNavigate()

  const clickHandler = () => {
    navigate('/login')
  }

  return (
    <nav className='bg-gray-200 px-2.5 py-4 flex justify-between items-center'>
      <Link to='/'>
        <h1 className='font-bold font text-xl'>PostApp</h1>
      </Link>
      <Button
        asChild
        onClick={() => setToggleMenu((prev) => !prev)}
        variant='outline'
      >
        <Sidebar toggleMenu={toggleMenu} />
      </Button>
      <Button
        onClick={clickHandler}
        className='hidden md:block'
      >
        Login
      </Button>
    </nav>
  )
}

export default MainNavigation
