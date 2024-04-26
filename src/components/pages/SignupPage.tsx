import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import InputField from '../InputField'
import Avatars from '../Avatars'

const SignupPage = () => {
  return (
    <section className='flex justify-center p-5 mt-10'>
      <Card className='max-w-sm w-full sm:max-w-sm px-2.5'>
        <CardHeader className='text-center'>
          <CardTitle>Let's Get Started</CardTitle>
          <CardDescription>
            Create an account and post what is in your mind
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <InputField
                label='Email'
                type='email'
                placeholder='example@gmail.com'
              />
              <InputField
                label='Password'
                type='password'
                placeholder='Your Password'
              />
              <InputField
                label='UserId'
                type='userid'
                placeholder='Your UserId'
              />
            </div>
            <Avatars />
          </form>
        </CardContent>
        <CardFooter className='flex flex-col justify-between'>
          <Button className='block w-full'>Sign Up</Button>
          <p className='text-sm mt-2'>
            Already have an accound?{' '}
            <Link className='text-blue-700' to='/login'>
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}

export default SignupPage
