import User from "models/User";
import api from "shared/utils/api";
import * as yup from 'yup';
import { values } from 'lodash';
import { Organization } from 'models/Organization';

export type RegisterFormI = yup.InferType<typeof RegisterService.VALIDATION_SCHEMA>
class RegisterService {
  static rootPrefix = '/register';

  static VALIDATION_SCHEMA = yup.object().shape({
    username: yup.string().trim().required('Поле не может быть пустым'),
    firstName: yup.string().when('organization', {
      is: (organization) => organization.type === Organization.INDIVIDUAL,
      then: yup.string().trim().required('Поле не может быть пустым'),
    }),
    lastName: yup.string().when('organization', {
      is: (organization) => organization.type === Organization.INDIVIDUAL,
      then: yup.string().trim().required('Поле не может быть пустым')
    }),
    patronymicName: yup.string().when('organization', {
      is: (organization) => organization.type === Organization.INDIVIDUAL,
      then: yup.string().trim().required('Поле не может быть пустым')
    }),
    organization: yup.object().shape({
      inn: yup.string().test('len', 'Длина должна составлять ровно 10 символов', val => val?.length === 10),
      type: yup.string().oneOf(values(Organization.types)).required().default(Organization.ENTITY),
      isSeller: yup.boolean().default(false).required(),
      name: yup.string().when('type', {
        is: Organization.ENTITY,
        then: yup.string().required('Поле не может быть пустым'),
      }),
    }),
    email: yup.string().email('Неверный формат e-mail').required('Поле не может быть пустым'),
    phone: yup.string().matches(/^\+7\d{10}$/, 'Неверный формат телефона').required('Неверный формат телефона, проверьте длину символов'),
    password: yup.string().required('Поле не может быть пустым'),
    user_agreement: yup.boolean()
      .equals([true], 'Пожалуйста, ознакомьтесь с условиями пользовательского соглашения')
      .required('Пожалуйста, ознакомьтесь с условиями пользовательского соглашения'),
    personal_data: yup.boolean().
      equals([true], 'Пожалуйста, дайте согласие на обработку ПД')
      .required('Пожалуйста, дайте согласие на обработку ПД')
  });

  static async register(user: Omit<RegisterFormI, 'user_agreement' | 'personal_data'>): Promise<{ user: any, code: string, error: string | object }> {

    try {
      const response = await api.post({ url: this.rootPrefix, variables: user });

      if (response.success) {
        return { user: response.user, code: response.test_code, error: null };
      }

    } catch (err) {
      return { error: err, user: null, code: null };
    }
  }

  /**
   * Resend confirmation code
   * @param phone string
   */
  static async resend(phone: string): Promise<{ code: number, error: string }> {
    const url = `${this.rootPrefix}/${phone}/resent`;

    try {
      const { success, code } = await api.post({ url });

      if (success) {
        return { code, error: null };
      }

    } catch (err) {
      return { error: err.message, code: null };
    }
  }

  /**
   * Confirm registration via phone number
   * @param phone string
   */
  static async confirm(phone: string, code: string): Promise<{ success: boolean, error: string }> {
    const url = `${this.rootPrefix}/${phone}/confirm`;
    console.log(phone);
    try {
      const { success } = await api.post({ url, variables: { code } });

      if (success) {
        return { success: true, error: null };
      }

    } catch (err) {
      return { error: err.message, success: false };
    }
  }
}

export default RegisterService;