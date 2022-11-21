import { DomainEntity, Uuid } from '@slack-clone/kernel';
import { Nullable } from '@slack-clone/util-types';
import { ThreadType } from './threadType';

interface ThreadProps {
  name: string;
  type: ThreadType;
  parentThreadId: Nullable<Uuid>;
  threadMembers: Uuid[];
}

enum ThreadUpdatableFields {
  name = 'name',
  type = 'type',
  parentThreadId = 'parentThreadId',
  threadMembers = 'threadMembers'
}

export class Thread extends DomainEntity<ThreadProps, ThreadUpdatableFields> {
  public get name(): string {
    return this.props.name;
  }

  public set name(value: string) {
    this.props.name = value;
    this.updatedFields.add(ThreadUpdatableFields.name);
  }

  public get type(): ThreadType {
    return this.props.type;
  }

  public set type(value: ThreadType) {
    this.props.type = value;
    this.updatedFields.add(ThreadUpdatableFields.type);
  }

  public get parentThreadId(): Nullable<Uuid> {
    return this.props.parentThreadId;
  }

  public set parentThreadId(value: Nullable<Uuid>) {
    this.props.parentThreadId = value;
    this.updatedFields.add(ThreadUpdatableFields.parentThreadId);
  }

  public get threadMembers(): Uuid[] {
    return this.props.threadMembers;
  }

  public set threadMembers(value: Uuid[]) {
    this.props.threadMembers = value;
    this.updatedFields.add(ThreadUpdatableFields.threadMembers);
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
