import React, {
  forwardRef,
  useState,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ChangeEvent,
  useCallback,
} from 'react';
import useNumber from './useNumber';
import useTel from './useTel';
import styles from './Styles.module.scss';


export interface InputI extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
  onChange: (value: any, e: ChangeEvent<HTMLInputElement>) => void,
  className?: string,
  filter?: RegExp,
  invalid?: boolean,
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputI>(({
  className, filter, onChange, invalid, defaultValue, ...inputProps
}, ref) => {
  const [inputValue, setInputValue] = useState(defaultValue as string || '');
  const { handleNumberKeyDown } = useNumber();
  const { handleTelKeyDown } = useTel();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { type } = inputProps;

    if (type === 'tel' && !value) {
      setInputValue('+7');
    } else {
      setInputValue(value);
    }

    if (!filter || filter.test(value)) {
      onChange(value, e);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { type } = inputProps;

    if (type === 'number') {
      handleNumberKeyDown(e, inputProps);
    }

    if (type === 'tel') {
      handleTelKeyDown(e, inputValue);
    }

  }

  const handleFocus = () => {
    const { type } = inputProps;

    if (type === 'tel') {
      if (!inputValue) {
        setInputValue('+7');
      }
    }
  }

  const inputCls = useCallback(() => setInputCls(className, invalid), [className, invalid]);

  return (
    <input
      {...inputProps}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      className={inputCls()}
      value={inputValue}
      ref={ref}
    />
  )
});

function setInputCls(className: string, invalid: boolean) {
  if (!invalid) {
    return [styles.input, className].join(' ');
  }
  return [styles['input-error'], className].join(' ');
}

Input.displayName = 'MyInput';

Input.defaultProps = {
  className: '',
  filter: null
}

export default Input;