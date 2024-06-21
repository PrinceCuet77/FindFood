import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import InputField from '../InputField'
// import Avatars from '../Avatars'
import { Button } from '../ui/button'
import useInput from '@/hooks/useInput'
import { isEmail, isNotEmpty } from '@/lib/utils'

const SignupPage = () => {
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

  const {
    value: enteredUserId,
    isValid: enteredUserIdIsValid,
    hasError: userIdInputIsInvalid,
    inputClasses: userIdInputClasses,
    inputChangeHandler: userIdInputChangeHandler,
    inputBlurHandler: userIdInputBlurHandler,
    reset: resetUserIdInput,
  } = useInput(isNotEmpty)

  const [isSelected, setIsSelected] = useState<string | null>(null)

  let formIsValid = false
  if (
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredUserIdIsValid &&
    isSelected
  ) {
    formIsValid = true
  }

  const clickHandler = () => {
    if (!formIsValid) {
      return
    }

    console.log(enteredEmail)
    console.log(enteredPassword)
    console.log(enteredUserId)
    console.log(isSelected)

    resetPasswordInput()
    resetEmailInput()
    resetUserIdInput()
    setIsSelected(null)
  }

  return (
    <section className='flex justify-center p-5 mt-10'>
      <Card className='max-w-sm w-full sm:max-w-sm px-2.5'>
        <CardHeader className='text-center'>
          <CardTitle>Let's Get Started</CardTitle>
          <CardDescription>
            Create an account and order your food
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
                mode={true}
                onBlur={passwordInputBlurHandler}
                invalid={passwordInputIsInvalid}
                className={passwordInputClasses}
              />
              <InputField
                label='UserId'
                type='text'
                placeholder='Your User ID'
                value={enteredUserId}
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  userIdInputChangeHandler(event.currentTarget.value)
                }
                onBlur={userIdInputBlurHandler}
                invalid={userIdInputIsInvalid}
                className={userIdInputClasses}
              />
            </div>
            {/* <Avatars
              isSelected={isSelected}
              onSelect={setIsSelected}
            /> */}
          </form>
        </CardContent>
        <CardFooter className='flex flex-col justify-between'>
          <Button
            onClick={clickHandler}
            type='button'
            className={'block w-full cursor-pointer'}
            disabled={!formIsValid}
          >
            Sign Up
          </Button>
          <p className='text-sm mt-2'>
            Already have an accound?{' '}
            <Link
              className='text-blue-700'
              to='/login'
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}

export default SignupPage
