import Checkbox, { CheckboxI } from "shared/UI/Checkbox";
import Input, { InputI } from "@/UI/Input";
import RadioInput, { RadioInputI } from "@/UI/RadioInput";
import { omit, uniqueId } from "lodash";
import React from "react";
import styles from './Styles.module.scss';
import Spinner from "../Spinner";

type onChangeFunctionType = <T extends string | {}, P>(value: T, ...props: P[]) => any

export interface FieldComponentI extends
  Omit<InputI, 'onChange'>,
  Omit<RadioInputI, 'onChange'>,
  Omit<CheckboxI, 'onChange'> {
  onChange?: onChangeFunctionType,
  error?: string,
  tip?: JSX.Element,
  label?: string,
  isProcessing?: boolean,
}

const generateField = (Component) => {
  const FieldComponent = ({ error, tip, label, isProcessing, ...props }: FieldComponentI) => {
    const fieldId = uniqueId('form-field-');
    const { name } = props;

    return (
      <div
        className={[styles['form-control'], props.className].join(' ')}
        data-testid={props.name ? `form-field:${name}` : 'form-field'}
      >
        {label &&
          <label
            htmlFor={fieldId}
            className={styles['form-label']}
          >
            {label}
          </label>
        }
        <Component
          {...omit(props, ['className'])}
          id={fieldId}
          invalid={error ? true : undefined}
        />
        {isProcessing && <Spinner className={styles.processing} />}
        {tip && <div className={styles.tip}>{tip}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    )
  }

  FieldComponent.displayName = 'FieldComponent';
  return FieldComponent;

}

const Fields = {
  Input: generateField(Input),
  Radio: generateField(RadioInput),
  Checkbox: generateField(Checkbox),
}

export default Fields;

