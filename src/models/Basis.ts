import { EntityI } from '.';

export default interface BasisI extends EntityI {
  name: string,
  address: string,
  longituted: number,
  latitude: number,
}