import { Uuid } from './uuid';

export abstract class DomainEntity<T> {
  private readonly identifier: Uuid;
  private readonly createdAt?: Date;

  public static isEntity(v: any): v is DomainEntity<any> {
    return v instanceof DomainEntity;
  }

  protected constructor(public readonly props: Required<T>, id?: Uuid) {
    this.identifier = id || new Uuid();
    if (!id) {
      this.createdAt = new Date();
    }
  }

  get id(): Uuid {
    return this.identifier;
  }
}
