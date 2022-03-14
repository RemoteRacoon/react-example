import { FormikValues } from "formik";
import { uniqBy } from "lodash";
import * as yup from 'yup';

export function getFieldsValid(values: FormikValues, schema: yup.ObjectSchema<any>, numOfFields: number) {
  try {
    schema.validateSync(values, { abortEarly: false });
  } catch (err) {
    return numOfFields - uniqBy(err.inner, 'path').length;
  }

  return numOfFields;
}
