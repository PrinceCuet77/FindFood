import { type FormEvent } from 'react'

import { Input } from './ui/input'
import { Label } from './ui/label'
import InputPasswordField from './Password/InputPasswordField'

export type InputFieldType = {
  label: string
  type: string
  placeholder: string
  value: string
  invalid: boolean
  className: string
  mode?: boolean
  onChange: (event: FormEvent<HTMLInputElement>) => void
  onBlur: () => void
}

const InputField = ({ label, type, invalid, ...restProps }: InputFieldType) => {
  if (type === 'password') {
    return (
      <InputPasswordField
        label={label}
        type={type}
        invalid={invalid}
        {...restProps}
      />
    )
  }

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label
        className={`${invalid ? 'text-red-400' : ''}`}
        htmlFor={type}
      >
        {label}
      </Label>
      <Input
        id={label}
        type={type}
        {...restProps}
      />
      {invalid && (
        <p className='text-red-400 text-sm'>
          {label === 'Email'
            ? 'Please entered a valid email.'
            : 'Please entered an user id'}
        </p>
      )}
    </div>
  )
}

export default InputField
