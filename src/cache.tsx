import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import { CartItems } from "./models/cartItems";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            const data = cartItemsVar();
            return data;
          },
        },
      },
    },
  },
});

/**
 * Set initial values when we create cache variables.
 */

const cartItemsInitialValue: CartItems = [
  {
    id: 0,
    product: {
      name: "Sample",
      price: "10000",
      imgUrl: "",
    },
    amount: 5,
  },
];

export const cartItemsVar: ReactiveVar<CartItems> = makeVar<CartItems>(
  cartItemsInitialValue
);
