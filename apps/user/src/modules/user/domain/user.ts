import { DomainEntity, Uuid } from '@slack-clone/kernel';
import { Nullable } from '@slack-clone/util-types';
import { UserRole } from './userRole';
import { err, ok, Result } from 'neverthrow';

interface UserProps {
  name: string;
  email: string;
  password: string;
  profilePicture: Nullable<string>;
  role: UserRole;
}

enum UserUpdatableFields {
  name = 'name',
  email = 'email',
  password = 'password',
  profilePicture = 'profilePicture',
  role = 'role'
}

export class User extends DomainEntity<UserProps, UserUpdatableFields> {
  private constructor(props: UserProps, id?: Uuid) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
    this.setFieldUpdated(UserUpdatableFields.name);
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
    this.setFieldUpdated(UserUpdatableFields.email);
  }

  get password(): string {
    return this.props.password;
  }

  set password(value: string) {
    if (!this.validatePassword(value)) {
      throw new Error('Password length must be 5 or more');
    }

    this.props.password = value;
    this.setFieldUpdated(UserUpdatableFields.password);
  }

  get profilePicture(): Nullable<string> {
    return this.props.profilePicture;
  }

  set profilePicture(value: Nullable<string>) {
    this.props.profilePicture = value;
    this.setFieldUpdated(UserUpdatableFields.profilePicture);
  }

  get role(): UserRole {
    return this.props.role;
  }

  set role(value: UserRole) {
    this.props.role = value;
    this.setFieldUpdated(UserUpdatableFields.role);
  }

  private validatePassword(password: string): boolean {
    return password.length >= 5;
  }

  static create(props: UserProps, id?: string): Result<User, any> {
    if (props.password.length < 5) {
      return err('Password length must be 5 or more');
    }

    return ok(
      new User(
        {
          ...props
        },
        new Uuid(id)
      )
    );
  }
}
