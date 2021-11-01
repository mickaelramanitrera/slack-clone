import { gql } from '@apollo/client';
import { IFetchChannelParameters } from '../types/channel';

export const fetchChannels = async ({ graphql }: IFetchChannelParameters): Promise<any> => {
  const results = await graphql.query({
    query: gql`
      query FetchChannels {
        channels {
          id
          name
          description
          type
          owner {
            id
            username
            username
          }
          members {
            id
            username
            email
          }
        }
      }
    `,
  });

  return results.data;
};
