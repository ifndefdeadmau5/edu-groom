import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['String'];
  imgUrl: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addProduct?: Maybe<Product>;
};


export type MutationAddProductArgs = {
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'imgUrl'>
  )> }
);

export type AddProductMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
}>;


export type AddProductMutation = (
  { __typename?: 'Mutation' }
  & { addProduct?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id'>
  )> }
);


export const GetProductsDocument = gql`
    query GetProducts {
  products {
    id
    name
    price
    imgUrl
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, baseOptions);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const AddProductDocument = gql`
    mutation AddProduct($name: String, $price: String, $imgUrl: String) {
  addProduct(name: $name, price: $price, imgUrl: $imgUrl) {
    id
  }
}
    `;
export type AddProductMutationFn = Apollo.MutationFunction<AddProductMutation, AddProductMutationVariables>;

/**
 * __useAddProductMutation__
 *
 * To run a mutation, you first call `useAddProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductMutation, { data, loading, error }] = useAddProductMutation({
 *   variables: {
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      imgUrl: // value for 'imgUrl'
 *   },
 * });
 */
export function useAddProductMutation(baseOptions?: Apollo.MutationHookOptions<AddProductMutation, AddProductMutationVariables>) {
        return Apollo.useMutation<AddProductMutation, AddProductMutationVariables>(AddProductDocument, baseOptions);
      }
export type AddProductMutationHookResult = ReturnType<typeof useAddProductMutation>;
export type AddProductMutationResult = Apollo.MutationResult<AddProductMutation>;
export type AddProductMutationOptions = Apollo.BaseMutationOptions<AddProductMutation, AddProductMutationVariables>;