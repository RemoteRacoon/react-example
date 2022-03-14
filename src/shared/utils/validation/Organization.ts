import * as yup from 'yup';
import { OrgType } from 'models/Organization';
import UserValidation from './User';

const messages = {
  empty: 'Поле не может быть пустым',
  inn: (type: OrgType) => ({
    message: `Длина должна составлять ровно ${type === OrgType.Entity ? 10 : 12} символов`,
    len: type === OrgType.Entity ? 10 : 12
  }),
  ogrn: (type: OrgType) => ({
    message: `Длина должна составлять ровно ${type === OrgType.Entity ? 13 : 15} символов`,
    len: OrgType.Entity ? 13 : 15
  }),
  kpp: {
    message: 'Длина должна составлять ровно 9 символов',
    len: 9
  }
}

const validations = {
  name: yup.string().required(messages.empty),
  type: yup.string().oneOf([OrgType.Entity, OrgType.IE]).required().default(OrgType.Entity),
  inn: (type: OrgType) => yup
    .string()
    .test('len', messages.inn(type).message, val => val?.length === messages.inn(type).len)
    .required(messages.empty),
  kpp: yup.string().test('len', messages.kpp.message, val => val?.length === messages.kpp.len),
  orgn: (type: OrgType) => yup.string().test('len', messages.ogrn(type).message, val => val?.length === messages.ogrn(type).len),
  juridicalAddress: yup.string().required(messages.empty),
  correspondenceAddress: yup.string().required(messages.empty),
  directorName: UserValidation.fio,
}

export default validations;