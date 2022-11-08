import { DomainEntity, Uuid } from '@slack-clone/kernel';
import { Nullable } from '@slack-clone/util-types';
import { ThreadType } from './threadType';

interface ThreadProps {
  name: string;
  type: ThreadType;
  parentThreadId: Nullable<Uuid>;
  threadMembers: Uuid[];
}

export class Thread extends DomainEntity<ThreadProps> {
  public get name(): string {
    return this.props.name;
  }

  public get type(): ThreadType {
    return this.props.type;
  }

  public get parentThreadId(): Nullable<Uuid> {
    return this.props.parentThreadId;
  }

  public get threadMembers(): Uuid[] {
    return this.props.threadMembers;
  }

  private constructor(props: ThreadProps, id?: Uuid) {
    super(props, id);
  }

  static create(props: ThreadProps, id?: string): Thread {
    return new Thread(
      {
        ...props
      },
      new Uuid(id)
    );
  }
}
