import styles from './Styles.module.scss';
import { FC, useContext, useState } from 'react';
import User from 'models/User';
import { Organization } from 'models/Organization';
import RegisterCtx from '../RegisterContext';
import Form from '@/UI/Form';
import SubmitButton from '@/UI/Form/SubmitButton';
import RegisterService, { RegisterFormI } from 'services/RegisterService';
import { omit } from 'lodash';

const RegisterForm: FC = () => {
  const organization = new Organization();
  const user = new User();

  const { setIsSeller, isSeller, setUser, onRegister } = useContext(RegisterCtx);
  const [entityType, setEntityType] = useState(user.$organization.$type);

  return (
    <div className={styles.container}>
      <Form
        initialValues={{
          ...RegisterService.VALIDATION_SCHEMA.default,
          // Устанавливаем дефолтные значения, чтобы в случае, если
          // они останутся дефолтными, они отобразились в данных
          organization: {
            type: organization.$type,
            isSeller: organization.$isSeller
          },
          user_agreement: undefined,
          personal_data: undefined,
        } as RegisterFormI}
        validateOnBlur={false}
        validateOnMount={true}
        validationSchema={RegisterService.VALIDATION_SCHEMA}
        onSubmit={async (values, form) => {
          const userData = omit(values, ['user_agreement', 'personal_data']);
          const { user, code, error } = await RegisterService.register(userData);

          if (user) {
            setUser({ ...userData, confirmCode: +code, phone: user.phone });
            setTimeout(() => onRegister(), 0);
          } else {
            Form.handleApiErrors(error, form);
          }

          form.setSubmitting(false);
        }}
      >
        {({ setFieldValue }) => {

          return (
            <Form.Element>
              <Form.Heading>Регистрация</Form.Heading>

              <Form.Field.Radio
                items={Object.values(Organization.types)}
                defaultValue={entityType}
                name={'organization.type'}
                onChange={value => {
                  setEntityType(value as string);
                  setFieldValue('organization.type', value);
                }}
              />

              <Form.Field.Radio
                items={Organization.ROLES}
                defaultValue={isSeller ? Organization.ROLE_SELLER : Organization.ROLE_BUYER}
                name={'organization.isSeller'}
                onChange={value => {
                  const isSeller = value === Organization.ROLE_SELLER ? true : false
                  setFieldValue('organization.isSeller', isSeller);
                  setIsSeller(isSeller)
                }}
              />

              <Form.Field.Input
                label='Имя пользователя'
                placeholder='введите логин'
                name='username'
              />

              {entityType === 'ООО' ?
                <Form.Field.Input
                  label='Полное наименование организации'
                  placeholder='например, ООО Нефть'
                  name='organization.name'
                />
                :
                <>
                  <Form.Field.Input
                    label='Фамилия'
                    placeholder='введите фамилию'
                    name='lastName'
                  />
                  <Form.Field.Input
                    label='Имя'
                    placeholder='введите имя'
                    name='firstName'
                  />
                  <Form.Field.Input
                    label='Отчество'
                    placeholder='введите отчество'
                    name='patronymicName'
                  />
                </>

              }
              <Form.Field.Input
                label='ИНН'
                type='number'
                min={0}
                max={9999999999}
                placeholder='введите номер из 10 цифр'
                name='organization.inn'
              />

              <Form.Field.Input
                label='Контактный e-mail'
                placeholder='ввдите почту'
                type='email'
                name='email'
              />

              <Form.Field.Input
                label='Номер телефона'
                placeholder='+7-XXX-XXX-XX-XX'
                maxLength={12}
                name='phone'
                type='tel'
              />

              <Form.Field.Input
                label='Пароль'
                placeholder='Придумайте пароль'
                name='password'
                type='password'
              />

              <Form.Field.Checkbox name='personal_data'>
                <div className={styles['checkbox-label']}>
                  даю согласие на <span className={styles.link}>обработку персональных данных</span>
                </div>
              </Form.Field.Checkbox >
              <Form.Field.Checkbox name='user_agreement'>
                <div className={styles['checkbox-label']}>
                  принимаю <span className={styles.link}>Пользовательское соглашение</span>
                </div>
              </Form.Field.Checkbox >

              <SubmitButton
                color='primary'
                variant='contained'
                className={styles['submit-button']}
              >
                Зарегистрироваться
              </SubmitButton>
            </Form.Element>
          )
        }}

      </Form>
    </div >
  )
}

RegisterForm.displayName = 'RegisterForm';

export default RegisterForm;