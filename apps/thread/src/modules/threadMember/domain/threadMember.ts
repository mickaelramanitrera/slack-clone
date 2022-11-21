import {DomainEntity, ThreadMemberRole, Uuid} from "@slack-clone/kernel";
import {Nullable} from "@slack-clone/util-types";

interface ThreadMemberProps {
  name: string;
  userId: Uuid;
  threadId: Uuid;
  role: ThreadMemberRole;
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>
}

enum ThreadMemberFields {
  name = 'name', 
  userId = 'userId',
  threadId = 'threadId',
  role = 'role',
}

export class ThreadMember extends DomainEntity<ThreadMemberProps, ThreadMemberFields> {
  private constructor(props: any, id?: Uuid) {
    super(props, id);
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(value: string) {
    this.props.name = value;
    this.props.updatedAt = new Date();
  }

  public get userId(): Uuid {
    return this.props.userId;
  }

  public set userId(value: Uuid) {
    this.props.userId = value;
    this.props.updatedAt = new Date();
  }

  public get threadId(): Uuid {
    return this.props.threadId;
  }

  public set threadId(value: Uuid) {
    this.props.threadId = value;
    this.props.updatedAt = new Date();
  }

  public get role(): ThreadMemberRole {
    return this.props.role;
  }

  public set role(value: ThreadMemberRole) {
    this.props.role = value;
    this.props.updatedAt = new Date();
  }

  static create(props: ThreadMemberProps, id?: string): ThreadMember {
    return new ThreadMember({
      ...props,
      createdAt: !id ? new Date() : props.createdAt,
    }, new Uuid(id));    
  }
}

