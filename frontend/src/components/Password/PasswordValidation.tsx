import { type FormEvent } from 'react';

import { Input } from '../ui/input';
import { CircleChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type PasswordValidationProps = {
  type: string;
  placeholder: string;
  value: string;
  isVisible: boolean;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

const PasswordValidation = ({
  type,
  value,
  isVisible,
  ...restProps
}: PasswordValidationProps) => {
  // Regular expressions to check for uppercase, lowercase, and numbers
  const hasUpperCase: boolean = /[A-Z]/.test(value);
  const hasLowerCase: boolean = /[a-z]/.test(value);
  const hasNumber: boolean = /\d/.test(value);
  const hasValidLength: boolean = value.length >= 8;

  const reqCSS = 'flex text-sm justify-start gap-2 items-center text-red-500';

  return (
    <>
      <Input
        type={type}
        value={value}
        {...restProps}
      />
      {isVisible && (
        <div className='mt-2 space-y-0.5'>
          <p className='text-sm'>PASSWORD REQUERMENTS:</p>
          <div className={cn(reqCSS, { 'text-green-900': hasUpperCase })}>
            <CircleChevronRight className='w-4 h-4' />
            <p>Must contain 1 uppercase letter</p>
          </div>
          <div className={cn(reqCSS, { 'text-green-900': hasLowerCase })}>
            <CircleChevronRight className='w-4 h-4' />
            <p>Must contain 1 lowercase letter</p>
          </div>
          <div className={cn(reqCSS, { 'text-green-900': hasNumber })}>
            <CircleChevronRight className='w-4 h-4' />
            <p>Must contain 1 number</p>
          </div>
          <div className={cn(reqCSS, { 'text-green-900': hasValidLength })}>
            <CircleChevronRight className='w-4 h-4' />
            <p>Must have at least 8 characters</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordValidation;
