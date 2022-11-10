import { Domains } from './domains';

export const Commands = {
  [Domains.thread]: {
    greet: { cmd: 'greet', domain: Domains.thread }
  },
  [Domains.user]: {
    greet: { cmd: 'greet', domain: Domains.user }
  }
};
