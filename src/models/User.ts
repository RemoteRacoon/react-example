import Entity from "./Entity";
import { Organization, OrganizationI } from "./Organization";

export interface UserI {
  firstName: string;
  lastName: string;
  patronymicName: string;
  username: string;
  roles: string[];
  email: string;
  phone: string;
  password: string;
  isPhoneConfirmed: boolean;
  confirmCode: number;
  organization: OrganizationI;
}

class User extends Entity {
  private firstName: string;
  private lastName: string;
  private patronymicName: string;
  private username: string;
  private roles: string[];
  private email: string;
  private phone: string;
  private password: string;
  private isPhoneConfirmed: boolean;
  private confirmCode: number;
  private organization: Organization;

  constructor() {
    super();
    this.firstName = '';
    this.lastName = '';
    this.patronymicName = '';
    this.username = '';
    this.roles = [];
    this.email = '';
    this.phone = '';
    this.password = '';
    this.isPhoneConfirmed = false;
    this.confirmCode = null;
    this.organization = new Organization();
  }

  /**
   * Getter $firstName
   * @return {string}
   */
  public get $firstName(): string {
    return this.firstName;
  }

  /**
   * Getter $lastName
   * @return {string}
   */
  public get $lastName(): string {
    return this.lastName;
  }

  /**
   * Getter $patronymicName
   * @return {string}
   */
  public get $patronymicName(): string {
    return this.patronymicName;
  }

  /**
   * Getter $username
   * @return {string}
   */
  public get $username(): string {
    return this.username;
  }

  /**
   * Getter $roles
   * @return {string[]}
   */
  public get $roles(): string[] {
    return this.roles;
  }

  /**
   * Getter $email
   * @return {string}
   */
  public get $email(): string {
    return this.email;
  }

  /**
   * Getter $phone
   * @return {string}
   */
  public get $phone(): string {
    return this.phone;
  }

  /**
   * Getter $isPhoneConfirmed
   * @return {boolean}
   */
  public get $isPhoneConfirmed(): boolean {
    return this.isPhoneConfirmed;
  }

  /**
   * Getter $confirmCode
   * @return {number}
   */
  public get $confirmCode(): number {
    return this.confirmCode;
  }

  /**
   * Setter $firstName
   * @param {string} value
   */
  public set $firstName(value: string) {
    this.firstName = value;
  }

  /**
   * Setter $lastName
   * @param {string} value
   */
  public set $lastName(value: string) {
    this.lastName = value;
  }

  /**
   * Setter $patronymicName
   * @param {string} value
   */
  public set $patronymicName(value: string) {
    this.patronymicName = value;
  }

  /**
   * Setter $username
   * @param {string} value
   */
  public set $username(value: string) {
    this.username = value;
  }

  /**
   * Setter $roles
   * @param {string[]} value
   */
  public set $roles(value: string[]) {
    this.roles = value;
  }

  /**
   * Setter $email
   * @param {string} value
   */
  public set $email(value: string) {
    this.email = value;
  }

  /**
   * Setter $phone
   * @param {string} value
   */
  public set $phone(value: string) {
    this.phone = value;
  }

  /**
   * Getter $password
   * @return {string}
   */
  public get $password(): string {
    return this.password;
  }

  /**
   * Setter $password
   * @param {string} value
   */
  public set $password(value: string) {
    this.password = value;
  }

  /**
   * Setter $isPhoneConfirmed
   * @param {boolean} value
   */
  public set $isPhoneConfirmed(value: boolean) {
    this.isPhoneConfirmed = value;
  }

  /**
   * Setter $confirmCode
   * @param {number} value
   */
  public set $confirmCode(value: number) {
    this.confirmCode = value;
  }


  /**
   * Getter $organization
   * @return {Orgranization}
   */
  public get $organization(): Organization {
    return this.organization;
  }

  /**
   * Setter $organization
   * @param {Orgranization} value
   */
  public set $organization(value: Organization) {
    this.organization = value;
  }

}


const user = new User();

export default User;