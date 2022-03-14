import styles from './Styles.module.scss';
import { FC, useContext, useState } from 'react';
import RegisterCtx from '../RegisterContext';
import Form from '@/UI/Form';
import SubmitButton from '@/UI/Form/SubmitButton';
import RegisterService from 'services/RegisterService';
import { get, omit } from 'lodash';
import { defaults, OrgRole, OrgType, ORG_ROLES, ORG_TYPES } from 'models/Organization';
import { RegisterFormI } from 'schemas';
import REGISTER_VALIDATION_SCHEMA from 'schemas/register/form'

const RegisterForm: FC = () => {

  const { setIsSeller, isSeller, setUser, onRegister } = useContext(RegisterCtx);
  const [entityType, setEntityType] = useState(defaults.ORG_TYPE);

  return (
    <div className={styles.container} key={entityType}>
      <Form
        initialValues={{
          organization: {
            type: defaults.ORG_TYPE,
            isSeller: defaults.IS_SELLER
          },
          phone: '',
          user_agreement: undefined,
          personal_data: undefined,
        } as RegisterFormI}
        validateOnBlur={false}
        validateOnMount={true}
        validationSchema={REGISTER_VALIDATION_SCHEMA(entityType)}
        onSubmit={async (values, form) => {
          const userData = omit<RegisterFormI>(values, ['user_agreement', 'personal_data']);
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
        {({ values, setFieldValue, setFieldError }) => {

          return (
            <Form.Element>
              <Form.Heading>Регистрация</Form.Heading>

              <Form.Field.Radio
                items={ORG_TYPES}
                defaultValue={entityType}
                name={'organization.type'}
                onChange={value => {
                  setEntityType(value as OrgType);
                  setFieldValue('organization.type', value);
                }}
              />

              <Form.Field.Radio
                items={ORG_ROLES}
                defaultValue={isSeller ? OrgRole.SELLER : OrgRole.BUYER}
                name={'organization.isSeller'}
                onChange={() => {
                  setFieldValue('organization.isSeller', !isSeller);
                  setIsSeller(!isSeller)
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
                max={entityType === OrgType.Entity ? 9999999999 : 999999999999}
                placeholder={`введите номер из ${entityType === OrgType.Entity ? 10 : 12} цифр`}
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
                filter={{
                  rule: get(values, 'phone').length === 0 ? /^\+/ :
                    get(values, 'phone').length === 1 ? /^\+7/ : null,
                  callback: () => setFieldError('phone', 'Формат телефона +7-XXX-XXX-XX-XX')
                }}
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