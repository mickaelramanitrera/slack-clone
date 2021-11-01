import { gql } from '@apollo/client';
import { IFetchChannelParameters } from '../types/channel';

export const fetchChannels = async ({ graphql, userId }: IFetchChannelParameters): Promise<any> => {
  const results = await graphql.query({
    query: gql`
      query FetchChannels($whereFilter: JSON) {
        channels(where: $whereFilter) {
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
    variables: {
      whereFilters: { members: { id: userId } },
    },
  });

  return results.data;
};
