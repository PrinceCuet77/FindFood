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
import { Label } from '@/components/ui/label'

const LoginPage = () => {
  return (
    <section className='flex justify-center p-5'>
      <Card className='max-w-2xl w-full sm:w-[60%]'>
        <CardHeader className='text-center'>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Welcome to PostApp! Sign In to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <input
                  type='email'
                  id='email'
                  placeholder='example@email.com'
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='password'>Password</Label>
                <input
                  type='password'
                  id='password'
                  placeholder='Your password'
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col justify-between'>
          <Button className='block w-full'>Sign In</Button>
          <p>
            Don't have an accound?{' '}
            <Link
              className='text-blue-700'
              to='/signup'
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}

export default LoginPage
