import { EntityI, UserI } from '.'
import TaskI from './Task'

export default interface DealI extends EntityI {
  lot: any,
  customer: UserI,
  amount: number,
  tasks: TaskI[],
  cost: number,
  isSellerReadyForDeal: boolean,
  isSellerReadyToShip: boolean,
  blockedSum: number,
}