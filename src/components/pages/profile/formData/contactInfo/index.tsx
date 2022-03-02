import Form from '@/UI/Form';
import React, { FC } from 'react'
import styles from '../Styles.module.scss';
import * as yup from 'yup';
import ProgressBar from '@/UI/ProgressBar';
import { useFormikContext } from 'formik';
import { get, intersection } from 'lodash';
import { paths } from 'deepdash-es/standalone';
import UserService from 'services/UserService';
import toast from 'shared/utils/toast';

export const CONTACT_INFO_SCHEMA = Object.freeze({
  organization: yup.object().shape({
    name: yup.string().required('Поле не может быть пустым')
  }),
  fio: yup.string().matches(/^([А-Яа-я]+)\s([А-Яа-я]+)\s([А-Яа-я]+)$/u, 'Неверный формат ФИО').required('Поле не может быть пустым'),
  phone: yup.string().matches(/^\+7\d{10}$/, 'Неверный формат').required('Поле не может быть пустым'),
  email: yup.string().email('Неверный формат email').required('Поле не может быть пустым'),
});

const ContactInfoForm: FC = () => {
  const formik = useFormikContext();

  // Пока пользователь не может редактировать название организации, так что пока readonly
  const fieldsRequired = ['organization.name', 'fio', 'phone', 'email'];

  const getFieldsValid = () => {
    const { errors } = formik;

    return fieldsRequired.length - intersection(fieldsRequired, paths(errors)).length;
  }

  const sendData = async (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { target: { value, name } } = e;
    const payload = { [name]: value };
    const validationObject = yup.object({ [name]: CONTACT_INFO_SCHEMA[name] })

    // Оборачиваем в try catch, чтобы не получить ошибку во время разработки
    try {
      if (validationObject.validateSync(payload, { abortEarly: false })) {
        const { error } = await UserService.updateUser(payload);

        if (error) {
          toast.error(error);
        }
      }
    } catch (err) {
      return;
    }
  }

  return (
    <>
      <div className={styles.form__header}>
        <Form.Heading className={styles.form__title}>Контактная информация</Form.Heading>
        <ProgressBar total={fieldsRequired.length} complete={getFieldsValid()} />
      </div>
      <Form.Field.Input
        readOnly
        defaultValue={get(formik.values, 'organization.name')}
        className={styles.form__control}
        name='organization.name'
        label='Полное наименование организации'
        placeholder='ООО Роснефть'

      />
      <Form.Field.Input
        className={styles.form__control}
        name='fio'
        defaultValue={get(formik.values, 'fio')}
        label='Контактное лицо'
        placeholder='введите ФИО'
        onBlur={sendData}
      />
      <Form.Field.Input
        readOnly
        className={styles.form__control}
        name='phone'
        defaultValue={get(formik.values, 'phone')}
        type={'tel'}
        label='Номер телефона'
        placeholder='+7-XXX-XXX-XX-XX'
        tip={<span className={styles.form__tip}>Пожалуйста, свяжитесь с менеджером, если необходимо изменить номер телефона</span>}
      />
      <Form.Field.Input
        className={styles.form__control}
        name='email'
        defaultValue={get(formik.values, 'email')}
        label='Контактный email'
        placeholder='mail@mail.ru'
      />
    </>
  )
}

ContactInfoForm.displayName = 'ContactInfo-form';

export default ContactInfoForm