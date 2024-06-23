import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { InputFieldType } from '../InputField';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import PasswordValidation from './PasswordValidation';

const InputPasswordField = ({
  label,
  type,
  invalid,
  className,
  mode,
  value,
  ...restProps
}: InputFieldType) => {
  const [eyeStatus, setEyeStatus] = useState(true);

  const isVisible = value.length > 0;

  const visibilityHandler = () => {
    setEyeStatus((prev) => !prev);
  };

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5 relative'>
      <Label htmlFor={type}>{label}</Label>
      {mode ? (
        <PasswordValidation
          type={eyeStatus ? type : 'text'}
          value={value}
          isVisible={isVisible}
          {...restProps}
        />
      ) : (
        <Input
          type={eyeStatus ? type : 'text'}
          id={type}
          {...restProps}
        />
      )}
      {isVisible ? (
        eyeStatus ? (
          <EyeOff
            onClick={visibilityHandler}
            className='cursor-pointer opacity-50 absolute top-7 right-3'
          />
        ) : (
          <Eye
            onClick={visibilityHandler}
            className='cursor-pointer opacity-50 absolute top-7 right-3'
          />
        )
      ) : null}
    </div>
  );
};

export default InputPasswordField;
