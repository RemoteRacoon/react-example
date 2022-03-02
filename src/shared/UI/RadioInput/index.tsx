import React, { DetailedHTMLProps, FC, InputHTMLAttributes, useCallback, useState } from "react";
import styles from './Styles.module.scss';

export interface RadioInputI extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange' | 'type'> {
  onChange: (value: string) => any,
  items?: string[],
  containerCls?: string
}

const RadioInput: FC<RadioInputI> = ({ onChange, items, containerCls, defaultValue, ...props }) => {
  const [itemSelected, setItemSelected] = useState<string>(defaultValue as string || '');
  const containerClasses = useCallback(() => setContainerCls(containerCls), [containerCls]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setItemSelected(e.target.value);
    onChange(value);
  }

  return (
    <div role="group" className={containerClasses()}>
      {items.map(item => {
        return (
          <div key={item} className={styles.control}>
            <input
              {...props}
              className={styles.input}
              onChange={handleChange}
              checked={item === itemSelected}
              type="radio"
              value={item}
              id={item}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        )
      })}
    </div>
  )
}


function setContainerCls(cls: string) {
  return [styles.container, cls].join(' ');
}


RadioInput.displayName = 'RadioInput';

export default RadioInput;