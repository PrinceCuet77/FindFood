import { Input } from './ui/input'
import { Label } from './ui/label'
import InputPasswordField from './InputPasswordField'

export type InputFieldType = {
  label: string
  type: string
  placeholder: string
}

const InputField = ({ label, type, placeholder }: InputFieldType) => {
  if (type === 'password') {
    return (
      <InputPasswordField label={label} type={type} placeholder={placeholder} />
    )
  }

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor={type}>{label}</Label>
      <Input type={type} id={type} placeholder={placeholder} />
    </div>
  )
}

export default InputField
