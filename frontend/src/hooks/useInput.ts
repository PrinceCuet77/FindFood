import { useReducer } from 'react';

type InputAction = {
  type: 'INPUT';
  payload: string;
};

type BlurAction = {
  type: 'BLUR';
};

type ResetAction = {
  type: 'RESET';
};

type Action = InputAction | BlurAction | ResetAction;

type InputState = {
  input: string;
  isTouched: boolean;
};

const defaultState = {
  input: '',
  isTouched: false,
};

const reducer = (state: InputState, action: Action) => {
  if (action.type === 'INPUT') {
    return { input: action.payload, isTouched: state.isTouched };
  }

  if (action.type === 'BLUR') {
    return { input: state.input, isTouched: true };
  }

  if (action.type === 'RESET') {
    return defaultState;
  }

  return defaultState;
};

const useInput = (validateValue: (value: string) => boolean) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const isValid = validateValue(state.input);
  const hasError = !isValid && state.isTouched;

  const inputChangeHandler = (value: string) => {
    dispatch({ type: 'INPUT', payload: value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const inputClasses = hasError
    ? 'bg-red-100 outline outline-offset-2 outline-red-400 focus:bg-transparent'
    : '';

  return {
    value: state.input,
    isValid,
    hasError,
    inputClasses,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
