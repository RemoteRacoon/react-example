import keys from "shared/constants/keys";
import React, { DetailedHTMLProps, FC, useCallback, useEffect, useRef } from "react";
import styles from './Styles.module.scss';

export interface CheckboxI extends Omit<DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type' | 'onChange'> {
  onChange: (value: boolean) => any,
}

const Checkbox: FC<CheckboxI> = ({ onChange, className, children, ...props }) => {
  const $inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onChange(checked);
  }, [onChange])

  useEffect(() => {
    const elem = $inputRef.current;

    const handleEvent = (e: KeyboardEvent) => {
      if ([keys.ENTER, keys.SPACE].includes(e.key)) {
        $inputRef.current.checked = !$inputRef.current.checked;
        handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    }

    elem.addEventListener('keydown', handleEvent);

    return () => {
      elem.removeEventListener('keydown', handleEvent);
    }

  }, [handleChange]);


  return (
    <div className={styles.checkbox}>
      <input
        {...props}
        ref={$inputRef}
        onChange={handleChange}
        className={styles.input}
        type="checkbox"
      />
      <span className={styles.checkmark} />
      {children &&
        <label>
          {children}
        </label>
      }
    </div>
  )
}


export default Checkbox;