import { DomainEntity, Uuid } from '@slack-clone/kernel';
import { Nullable } from '@slack-clone/util-types';
import { ThreadMember } from './threadMember';

interface ThreadMessageProps {
  author: ThreadMember;
  content: any;
  deletedAt: Date;
  updatedAt: Nullable<Date>;
  threadId: Uuid;
  subThreadId: Nullable<Uuid>;
}

export class ThreadMessage extends DomainEntity<ThreadMessageProps> {
  private constructor(props: ThreadMessageProps, id?: Uuid) {
    super(props, id);
  }

  public get author(): ThreadMember {
    return this.props.author;
  }

  public get content(): any {
    return this.props.content;
  }

  public get deletedAt(): Date {
    return this.props.deletedAt;
  }

  public get updatedAt(): Nullable<Date> {
    return this.props.updatedAt;
  }

  public get threadId(): Uuid {
    return this.props.threadId;
  }

  public get subThreadId(): Nullable<Uuid> {
    return this.props.subThreadId;
  }

  static create(props: ThreadMessageProps, id?: string): ThreadMessage {
    return new ThreadMessage(
      {
        ...props
      },
      new Uuid(id)
    );
  }
}
