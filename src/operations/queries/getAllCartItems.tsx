import { gql } from "@apollo/client";

export const GET_ALL_CART_ITEMS = gql`
  query GetAllCartItems {
    cartItems @client {
      id
      # Below breaks useQuery
      # product {
      #   id
      #   name
      #   imgUrl
      # }
      amount
    }
  }
`;
