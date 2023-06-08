import { gql } from '@apollo/client';

export const FIND = gql`
  query find($id: Int!) {
    find(id: $id) {
      name
    }
  }
`;

export const UPDATE = gql`
  mutation update($id: Int!, $params: UserInput!) {
    update(id: $id, params: $params)
  }
`;
