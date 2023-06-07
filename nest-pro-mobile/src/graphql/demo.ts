import { gql } from '@apollo/client';

export const FIND = gql`
  query find($id: Int!) {
    find(id: $id) {
      name
    }
  }
`;
