import { gql } from '@apollo/client';
import { ICreateMessageParams, IFetchMessageParams } from '../types/message';

export const fetchMessages = async ({ graphql, channelId }: IFetchMessageParams): Promise<any> => {
  const results = await graphql.query({
    query: gql`
      query FetchMessages($whereFilter: JSON) {
        messages(where: $whereFilter) {
          id
          content
          from {
            id
            username
            email
          }
          channel {
            id
            name
            description
            type
          }
        }
      }
    `,
    variables: {
      whereFilter: {
        channel: { id: channelId },
      },
    },
  });
  console.log(results.data);

  return results.data;
};

export const createMessage = async ({ graphql, ...params }: ICreateMessageParams): Promise<any> => {
  const results = await graphql.mutate({
    mutation: gql`
      mutation CreateMessage($CreateMessageInput: createMessageInput!) {
        createMessage(input: $CreateMessageInput) {
          message {
            id
            created_at
            updated_at
            content
            channel {
              id
              name
              description
            }
            from {
              id
              username
              email
            }
          }
        }
      }
    `,
    variables: {
      CreateMessageInput: {
        data: {
          ...params,
        },
      },
    },
  });

  return results.data;
};
