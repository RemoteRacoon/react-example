import { Formik, Form as FormikForm, Field as FormikField, FormikConfig, FormikValues, FormikFormProps, FormikContextType, FormikHelpers } from 'formik';
import { get, mapValues } from 'lodash';
import React, { FC } from 'react';
import toast from 'shared/utils/toast';
import Fields, { FieldComponentI } from './Field';
import styles from './Styles.module.scss';

interface FormCompoentI extends FieldComponentI {
  name: string,
  validate?: Function
}
const Form = <T extends FormikValues>(props: FormikConfig<T>) => (
  <Formik {...props} disabled={true} />
)

const Element: FC<FormikFormProps> = (props) => {
  return (
    <FormikForm
      {...props}
      className={props.className || styles.form}
    />
  )
}

Element.displayName = 'Form';

// eslint-disable-next-line react/display-name
const Field = mapValues(Fields, FieldComponent => ({ name, onChange, validate, ...props }: FormCompoentI) => (
  <FormikField name={name} validate={validate}>
    {({ field, form: { touched, errors, setFieldValue, isSubmitting } }) => (
      <FieldComponent
        {...field}
        {...props}
        disabled={isSubmitting || props.disabled}
        onChange={onChange ? onChange : value => setFieldValue(name, value)}
        name={name}
        error={get(touched, name) && get(errors, name)}
      />
    )}
  </FormikField>
));

interface HeadingI extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> { }

const Heading: FC<HeadingI> = ({ children, ...props }) => {
  return (
    <h1
      {...props}
      className={props.className || styles['form-heading']}
    >
      {children}
    </h1>
  )
}

Heading.displayName = 'FormHeading';

const handleApiErrors = (error: any, form: FormikHelpers<any>) => {
  if (error.errors) {
    form.setErrors(error.errors);
  } else {
    toast.error(error.message);
  }
}

Form.Element = Element;
Form.Heading = Heading;
Form.Field = Field;
Form.handleApiErrors = handleApiErrors;

export default Form;
