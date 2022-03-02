import Entity from "./Entity";

export interface OrganizationI {
  name: string,
  inn: string,
  kpp: string,
  ogrn: string,
  juridicalAddress: string,
  correspondanceAddress: string;
  directorName: string;
  entitlementDocuments: Id[];
  type: ORG_TYPE;
  hasAccessToTrade: boolean;
  isSeller: boolean;
  isVip: boolean;
  isSignature: boolean;
}

export type ORG_TYPE = 'ИП' | 'ООО'

export class Organization extends Entity {
  static ENTITY = 'ООО';
  static INDIVIDUAL = 'ИП';
  static ROLES = ['Покупатель', 'Продавец'];
  static ROLE_BUYER = Organization.ROLES[0];
  static ROLE_SELLER = Organization.ROLES[1];

  static types = {
    entity: Organization.ENTITY,
    individual: Organization.INDIVIDUAL,
  }

  private name: string;
  private inn: string;
  private kpp: string;
  private ogrn: string;
  private juridicalAddress: string;
  private correspondanceAddress: string;
  private directorName: string;
  private entitlementDocuments: Id[];
  private type: string = Organization.types.entity;
  private hasAccessToTrade: boolean = false;
  private isSeller: boolean;
  private isVip: boolean = false;
  private isSignature: boolean = false;

  constructor() {
    super();

    const $self = Organization;
    this.name = '';
    this.inn = '';
    this.kpp = '';
    this.ogrn = '';
    this.juridicalAddress = '';
    this.correspondanceAddress = '';
    this.directorName = '';
    this.entitlementDocuments = [];
    this.type = $self.ENTITY;
    this.hasAccessToTrade = false;
    this.isSeller = false;
    this.isVip = false;
    this.isSignature = false;
  }


  /**
   * Getter $name
   * @return {string}
   */
  public get $name(): string {
    return this.name;
  }

  /**
   * Getter $inn
   * @return {string}
   */
  public get $inn(): string {
    return this.inn;
  }

  /**
   * Getter $kpp
   * @return {string}
   */
  public get $kpp(): string {
    return this.kpp;
  }

  /**
   * Getter $ogrn
   * @return {string}
   */
  public get $ogrn(): string {
    return this.ogrn;
  }

  /**
   * Getter $juridicalAddress
   * @return {string}
   */
  public get $juridicalAddress(): string {
    return this.juridicalAddress;
  }

  /**
   * Getter $correspondanceAddress
   * @return {string}
   */
  public get $correspondanceAddress(): string {
    return this.correspondanceAddress;
  }

  /**
   * Getter $directorName
   * @return {string}
   */
  public get $directorName(): string {
    return this.directorName;
  }

  /**
   * Getter $entitlementDocuments
   * @return {Id[]}
   */
  public get $entitlementDocuments(): Id[] {
    return this.entitlementDocuments;
  }

  /**
   * Getter $type
   * @return {string }
   */
  public get $type(): string {
    return this.type;
  }

  /**
   * Getter $hasAccessToTrade
   * @return {boolean }
   */
  public get $hasAccessToTrade(): boolean {
    return this.hasAccessToTrade;
  }

  /**
   * Getter $isSeller
   * @return {boolean}
   */
  public get $isSeller(): boolean {
    return this.isSeller;
  }

  /**
   * Getter $isVip
   * @return {boolean }
   */
  public get $isVip(): boolean {
    return this.isVip;
  }

  /**
   * Getter $isSignature
   * @return {boolean }
   */
  public get $isSignature(): boolean {
    return this.isSignature;
  }

  /**
   * Setter $name
   * @param {string} value
   */
  public set $name(value: string) {
    this.name = value;
  }

  /**
   * Setter $inn
   * @param {string} value
   */
  public set $inn(value: string) {
    this.inn = value;
  }

  /**
   * Setter $kpp
   * @param {string} value
   */
  public set $kpp(value: string) {
    this.kpp = value;
  }

  /**
   * Setter $ogrn
   * @param {string} value
   */
  public set $ogrn(value: string) {
    this.ogrn = value;
  }

  /**
   * Setter $juridicalAddress
   * @param {string} value
   */
  public set $juridicalAddress(value: string) {
    this.juridicalAddress = value;
  }

  /**
   * Setter $correspondanceAddress
   * @param {string} value
   */
  public set $correspondanceAddress(value: string) {
    this.correspondanceAddress = value;
  }

  /**
   * Setter $directorName
   * @param {string} value
   */
  public set $directorName(value: string) {
    this.directorName = value;
  }

  /**
   * Setter $entitlementDocuments
   * @param {Id[]} value
   */
  public set $entitlementDocuments(value: Id[]) {
    this.entitlementDocuments = value;
  }

  /**
   * Setter $type
   * @param {string } value
   */
  public set $type(value: string) {
    this.type = value;
  }

  /**
   * Setter $hasAccessToTrade
   * @param {boolean } value
   */
  public set $hasAccessToTrade(value: boolean) {
    this.hasAccessToTrade = value;
  }

  /**
   * Setter $isSeller
   * @param {boolean} value
   */
  public set $isSeller(value: boolean) {
    this.isSeller = value;
  }

  /**
   * Setter $isVip
   * @param {boolean } value
   */
  public set $isVip(value: boolean) {
    this.isVip = value;
  }

  /**
   * Setter $isSignature
   * @param {boolean } value
   */
  public set $isSignature(value: boolean) {
    this.isSignature = value;
  }


}
