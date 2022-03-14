import { EntityI, OrganizationI } from '.';

export default interface UserI extends EntityI {
  username: string,
  email: string,
  phone: string,
  firstName: string,
  lastName: string,
  patronymicName: string,
  isPhoneConfirmed: boolean,
  password: string,
  organization?: OrganizationI,
  confirmCode?: number,
}