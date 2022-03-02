import { useFormikContext } from 'formik';
import Button, { ButtonI } from 'shared/UI/Button';
import { omit } from 'lodash';

const SubmitButton = ({ children, ...props }: ButtonI) => {
  const formik = useFormikContext();

  const is = {
    working: formik.isSubmitting,
    disabled: !formik.isValid || formik.isValidating
  }

  return (
    <Button
      {...omit(props, 'ref')}
      type='submit'
      disabled={is.disabled}
      isWorking={is.working}
    >
      {children}
    </Button>
  )
}

export default SubmitButton;