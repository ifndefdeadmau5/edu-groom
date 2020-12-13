import { makeVar, ReactiveVar } from "@apollo/client";
import { CartItems } from "./models/cartItems";

export const cartItemsVar: ReactiveVar<CartItems> = makeVar<CartItems>([]);
