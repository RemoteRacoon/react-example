import { EntityI } from "models";

export interface ProductTypeI extends EntityI {
  isActive: boolean,
  name: string,
  productCategory: ProductCategoryI,
}


export interface ProductCategoryI extends EntityI {
  isActive: boolean,
  name: string,
  types: ProductTypeI[]
}

export default interface ProductI extends EntityI {
  productCategory: ProductCategoryI,
  productType: ProductTypeI,
  mark: string,
  etsngCode: string,
  analogs: number[],
  qualityPassport: any,
  isActive: boolean,
  createdAt: string
}
