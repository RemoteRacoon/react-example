import {
  EntityI,
  ProductI,
  OrganizationI,
  UserI
} from "models";

export enum TaskState {
  NEW = 'N',
  ASSIGNED = 'A',
  IN_WORK = 'W',
  DONE = 'D'
}

export enum TaskType {
  REGISTRATION = 'registration',
  DELETE_ACCOUNT = 'delete_account',
  ADD_PRODUCT = 'add_product',
  ADD_MANUFACTURER = 'add_manufacturer',
  DEAL = 'deal',
  PAYMENT = 'payment'
}

export enum TaskAction {
  CREATE = 'create',
  ASSIGN = 'assign',
  UNASSIGN = 'unassign',
  IN_WORK = 'in_work',
  DONE = 'done',
  APPROVE = 'approve',
  DECLINE = 'decline',
  COMMENT = 'comment',
  DELETE = 'delete'
}

export const TASK_STATES = [
  TaskState.NEW,
  TaskState.IN_WORK,
  TaskState.ASSIGNED,
  TaskState.DONE
]

export const TASK_TYPES = [
  TaskType.REGISTRATION,
  TaskType.PAYMENT,
  TaskType.DELETE_ACCOUNT,
  TaskType.DEAL,
  TaskType.ADD_PRODUCT,
  TaskType.ADD_MANUFACTURER
]

export const TASK_ACTIONS = [
  TaskAction.APPROVE,
  TaskAction.ASSIGN,
  TaskAction.COMMENT,
  TaskAction.CREATE,
  TaskAction.DECLINE,
  TaskAction.DELETE,
  TaskAction.DONE,
  TaskAction.IN_WORK,
  TaskAction.UNASSIGN
]

export default interface TaskI extends EntityI {
  state: TaskState,
  type: TaskType,
  assignedUser: UserI,
  assignedByUser: UserI,
  createdByUser: UserI,
  organization: OrganizationI,
  product: ProductI,
  deal: any,
  isApproved: boolean,
}