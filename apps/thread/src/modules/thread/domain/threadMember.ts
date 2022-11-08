import { DomainEntity, Uuid } from '@slack-clone/kernel';
import { ThreadMemberRole } from './threadMemberRole';

interface ThreadMemberProps {
  name: string;
  userId: Uuid;
  threadId: Uuid;
  role: ThreadMemberRole;
}

export class ThreadMember extends DomainEntity<ThreadMemberProps> {
  private constructor(props, id?: Uuid) {
    super(props, id);
  }

  public get name(): string {
    return this.props.name;
  }

  public get userId(): Uuid {
    return this.props.userId;
  }

  public get threadId(): Uuid {
    return this.props.threadId;
  }

  public get role(): ThreadMemberRole {
    return this.props.role;
  }

  static create(props: ThreadMemberProps, id?: string): ThreadMember {
    return new ThreadMember(
      {
        ...props
      },
      new Uuid(id)
    );
  }
}
