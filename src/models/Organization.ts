import { EntityI, EntitlementDocumentI } from '.';
import BankDetailsI from './BankDetails';

export enum OrgType {
  IE = 'ИП',
  Entity = 'ООО'
}

export enum OrgRole {
  SELLER = 'Продавец',
  BUYER = 'Покупатель'
}

export const ORG_TYPES = [OrgType.IE, OrgType.Entity];
export const ORG_ROLES = [OrgRole.BUYER, OrgRole.SELLER];

export const defaults = {
  ORG_TYPE: OrgType.Entity,
  IS_SELLER: false,
  HAS_ACCESS_TO_TRADE: false,
  CONFIRMED_ORG: false
}
export default interface OrganizationI extends EntityI {
  name: string,
  inn: string,
  type: OrgType,
  kpp: string,
  ogrn: string,
  juridicalAddress: string,
  correspondenceAddress: string,
  currentConfirmationTask: any,
  directorName: string,
  entitlementDocuments: EntitlementDocumentI[],
  bankDetails: BankDetailsI,
  confirmedOrganization: boolean,
  confirmationStatus: number,
  isSeller: boolean,
  balance: string,
  blockedSum: string,
  hasAccessToTrade: boolean,
}