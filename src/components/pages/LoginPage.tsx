import { type FormEvent } from 'react'
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
import useInput from '@/hooks/useInput'
import { isEmail, isNotEmpty } from '@/lib/utils'

const LoginPage = () => {
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputIsInvalid,
    inputClasses: emailInputClasses,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail)

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputIsInvalid,
    inputClasses: passwordInputClasses,
    inputChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isNotEmpty)

  let formIsValid = false
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true
  }

  const clickHandler = () => {
    if (!formIsValid) {
      return
    }

    console.log(enteredEmail)
    console.log(enteredPassword)

    resetPasswordInput()
    resetEmailInput()
  }

  return (
    <section className='flex justify-center p-5 mt-10'>
      <Card className='max-w-sm w-full sm:max-w-sm px-2.5'>
        <CardHeader className='text-center'>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Welcome to pinPost! Sign In to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <InputField
                label='Email'
                type='email'
                placeholder='example@gmail.com'
                value={enteredEmail}
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  emailInputChangeHandler(event.currentTarget.value)
                }
                onBlur={emailInputBlurHandler}
                invalid={emailInputIsInvalid}
                className={emailInputClasses}
              />
              <InputField
                label='Password'
                type='password'
                placeholder='Your Password'
                value={enteredPassword}
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  passwordInputChangeHandler(event.currentTarget.value)
                }
                onBlur={passwordInputBlurHandler}
                invalid={passwordInputIsInvalid}
                className={passwordInputClasses}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col justify-between'>
          <Button
            onClick={clickHandler}
            type='button'
            className={'block w-full cursor-pointer'}
            disabled={!formIsValid}
          >
            Sign In
          </Button>
          <p className='text-sm mt-2'>
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
