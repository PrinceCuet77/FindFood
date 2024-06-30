import { Link, useNavigate } from 'react-router-dom';

import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import logo from '../assets/logo.png';
import cart from '../assets/shopping-cart.svg';
import emptyCart from '../assets/empty-cart.png';

const MainNavigation = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/login');
  };

  return (
    <nav className='px-2.5 py-4 flex justify-between items-center border-b border-orange-300 sticky h-16 shadow-md'>
      <div>
        <Link to='/'>
          <img
            src={logo}
            alt='A logo'
            className='w-60 h-10'
          />
        </Link>
      </div>
      <div className='flex justify-between gap-2 items-center'>
        0 BDT
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='link'>
              <div className='relative'>
                <Badge className='absolute left-3 bottom-4'>0</Badge>
                <img
                  src={cart}
                  alt='A shopping cart'
                />
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            <div className='grid gap-4 py-4 justify-center'>
              <img
                src={emptyCart}
                alt='An empty cart'
                className='size-40'
              />
              <p>No food items on the cart</p>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type='submit'>Return To Find Foods</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src='https://github.com/shadcn.png'
                alt='@shadcn'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuItem>
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>My Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Wishlist</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Password Change</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Manage Your Data</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onClick={clickHandler}
          className='hidden md:block'
        >
          Login
        </Button>
      </div>
    </nav>
  );
};

export default MainNavigation;
