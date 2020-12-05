import { CartItems, CartItem } from "../../models/cartItems";
import { ReactiveVar } from "@apollo/client";

export default function createAddCartItem(
  cartItemsVar: ReactiveVar<CartItems>
) {
  const createNewCartItemId = (allCartItems: CartItems) => {
    return (
      allCartItems.reduce(
        (maxId: number, cartItem: CartItem) => Math.max(cartItem.id, maxId),
        -1
      ) + 1
    );
  };

  const createNewCartItem = (product: any, allCartItems: CartItems) => {
    return { product, amount: 1, id: createNewCartItemId(allCartItems) };
  };

  return (product: any) => {
    const allCartItems = cartItemsVar();
    const newCartItem = createNewCartItem(product, allCartItems);

    console.log("allCartItems");
    console.log(allCartItems);
    console.log("newCartItem");
    console.log(newCartItem);
    cartItemsVar(allCartItems.concat([newCartItem]));
  };
}
