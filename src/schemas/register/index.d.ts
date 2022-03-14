import schema from './form';
import { UserI } from 'models';

export type REGISTER_SCHEMA_TYPE = ReturnType<typeof schema>

export type RegisterFormI =
  Pick<UserI, 'username' | 'password' | 'lastName' | 'firstName' | 'patronymicName' | 'email' | 'phone'>
  & {
    organization: Pick<OrganizationI, 'name' | 'inn' | 'type' | 'isSeller'>
  } & {
    user_agreement: boolean,
    personal_data: boolean
  }
