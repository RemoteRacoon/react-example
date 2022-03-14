import * as yup from 'yup';

const messages = {
  empty: 'Поле не может быть пустым',
  email: 'Неверный формат e-mail',
  fio: 'Неверный формат ФИО',
  phone: 'Формат телефона +7-XXX-XXX-XX-XX'
}

const validations = {
  username: yup.string().trim().required(messages.empty),
  email: yup.string().trim().email(messages.email).required(messages.empty),
  phone: yup.string().matches(/^\+7\d{10}$/, messages.phone).required(messages.empty),
  fio: yup
    .string()
    .trim()
    .matches(/^[А-ЯЁ][а-яё]*([-][А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*\s[А-ЯЁ][а-яё]*$/u, messages.fio),
  firstName: yup.string().trim().required(messages.empty),
  lastName: yup.string().trim().required(messages.empty),
  patronymicName: yup.string().trim().required(messages.empty),
  password: yup.string().required(messages.empty)
}

export default validations;