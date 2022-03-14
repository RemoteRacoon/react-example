/* eslint-disable import/no-anonymous-default-export */
import { OrgType } from 'models/Organization';
import { OrganizationValidation, UserValidation } from 'shared/utils/validation';
import * as yup from 'yup';

const schema = (type: OrgType) => yup.object().shape({
  username: UserValidation.username,
  firstName: type === OrgType.IE ? UserValidation.firstName : null,
  lastName: type === OrgType.IE ? UserValidation.lastName : null,
  patronymicName: type === OrgType.IE ? UserValidation.patronymicName : null,
  organization: yup.object().shape({
    type: yup.string().oneOf([OrgType.Entity, OrgType.IE]).required().default(OrgType.Entity),
    inn: OrganizationValidation.inn(type),
    isSeller: yup.boolean().default(false).required(),
    name: type === OrgType.Entity ? OrganizationValidation.name : null
  }),
  email: UserValidation.email,
  phone: UserValidation.phone,
  password: UserValidation.password,
  user_agreement: yup.boolean()
    .equals([true], 'Пожалуйста, ознакомьтесь с условиями пользовательского соглашения')
    .required('Пожалуйста, ознакомьтесь с условиями пользовательского соглашения'),
  personal_data: yup.boolean().
    equals([true], 'Пожалуйста, дайте согласие на обработку ПД')
    .required('Пожалуйста, дайте согласие на обработку ПД')
})

export default schema;
