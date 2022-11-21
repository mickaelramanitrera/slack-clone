import { Uuid } from './uuid';

export abstract class DomainEntity<T, F> {
  private readonly identifier: Uuid;
  private readonly createdAt?: Date;
  public updatedFields: Set<F> = new Set<F>();

  public static isEntity(v: any): v is DomainEntity<any, any> {
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

  setFieldUpdated(fieldName: F) {
    this.updatedFields.add(fieldName);
  }
}
