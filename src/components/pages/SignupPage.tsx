// import { Link } from 'react-router-dom'

// import { Button } from '@/components/ui/button'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import InputField from '../InputField'
// import Avatars from '../Avatars'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useInput from '@/hooks/useInput'

const isEmail = (value: string) => value.includes('@')
const isNotEmpty = (value: string) => value.trim() !== ''

const SignupPage = () => {
  // const [emailInput, setEmailInput] = useState('')
  // const [emailInputError, setEmailInputError] = useState(true)
  // const [passwordInput, setPasswordInput] = useState('')
  // const [userIdInput, setUserIdInput] = useState('')

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputIsInvalid,
    inputClasses: emailInputClasses,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail)

  let formIsValid = false
  if (enteredEmailIsValid) {
    formIsValid = true
  }

  const submitHandler = () => {
    
    if (!formIsValid) {
      return
    }
    
    // console.log(enteredName)
    console.log(enteredEmail)

    // resetNameInput()
    resetEmailInput()
  }

  return (
    <section className='flex justify-center p-5 mt-10 flex-col'>
      {/* <Card className='max-w-sm w-full sm:max-w-sm px-2.5'>
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
                value={emailInput}
                setValue={setEmailInput}
              />
              <InputField
                label='Password'
                type='password'
                placeholder='Your Password'
                value={passwordInput}
                setValue={setPasswordInput}
              />
              <InputField
                label='UserId'
                type='userid'
                placeholder='Your UserId'
                value={userIdInput}
                setValue={setUserIdInput}
              />
            </div>
            <Avatars />
          </form>
        </CardContent>
        <CardFooter className='flex flex-col justify-between'>
          <Button type='submit' onClick={submitHandler} className='block w-full'>Sign Up</Button>
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
      </Card> */}
      <p>Email</p>
      <Input
        type='email'
        onChange={(event) => emailInputChangeHandler(event.target.value)}
        onBlur={emailInputBlurHandler}
        value={enteredEmail}
        placeholder='example@gmail.com'
      />
      {emailInputIsInvalid && (
        <p className='text-red-600'>Please entered a valid email.</p>
      )}
      <Button onClick={submitHandler}>Submit</Button>
    </section>
  )
}

export default SignupPage
