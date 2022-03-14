import {
  EntityI,
  UserI,
  UploadedFileI,
  ProductI,
  DealI,
  BasisI,
  ManufacturerI
} from '.';

export enum DeliveryType {
  SELF_PICKUP = 'SELF_PICKUP',
  RAILROAD = 'RAILROAD'
}

export enum LotStatus {
  SAVED = 'SAVED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export const DELIVERY_TYPES = [DeliveryType.SELF_PICKUP, DeliveryType.RAILROAD];

export const LOT_STATUSES = [LotStatus.ARCHIVED, LotStatus.PUBLISHED, LotStatus.SAVED]

export default interface LotI extends EntityI {
  type: DeliveryType,
  user: UserI,
  product: ProductI,
  manufacturer: ManufacturerI,
  photo: UploadedFileI,
  qualityPassport: UploadedFileI,
  amount: number,
  blockedAmount: number,
  blockedSum: number,
  minimumToRequest: number,
  price: number,
  dispatchDays: number,
  status: string,
  density: number,
  publishedAt: string,
  unpublishedAt: string,
  basis?: BasisI,
  completitionDays?: number,
  station?: BasisI,
  wagonCapacity?: number,
  shipperName?: string,
  OKPOCode?: string,
  comment?: string,
  deals: DealI
}