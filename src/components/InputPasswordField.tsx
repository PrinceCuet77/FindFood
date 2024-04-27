import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { InputFieldType } from './InputField'
import { Input } from './ui/input'
import { Label } from './ui/label'

const InputPasswordField = ({
  label,
  type,
  invalid,
  className,
  ...restProps
}: InputFieldType) => {
  const [eyeStatus, setEyeStatus] = useState(true)

  const visibilityHandler = () => {
    setEyeStatus((prev) => !prev)
  }

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5 relative'>
      <Label htmlFor={type}>{label}</Label>
      <Input
        type={eyeStatus ? type : 'text'}
        id={type}
        {...restProps}
      />
      {eyeStatus ? (
        <EyeOff
          onClick={visibilityHandler}
          className='cursor-pointer opacity-50 absolute top-7 right-3'
        />
      ) : (
        <Eye
          onClick={visibilityHandler}
          className='cursor-pointer opacity-50 absolute top-7 right-3'
        />
      )}
    </div>
  )
}

export default InputPasswordField
