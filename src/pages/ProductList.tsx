import React from "react";
import { Grid } from "@material-ui/core";
import isEqual from "lodash/isEqual";
import cuid from "cuid";
import { cartItemsVar } from "../cache";
import ProductThumbnail from "../components/ProductThumbnail";
import { GetProductsQuery } from "../generated/graphql";

interface ProductListProps {
  products?: GetProductsQuery["products"];
  search?: string;
}

function areEqual(prev, next) {
  return isEqual(prev, next);
}

const ProductList = React.memo(
  ({ products, search = "" }: ProductListProps) => {
    console.log("render in ProductList");
    return (
      <Grid container justify="center" spacing={2}>
        {[...new Array(10)].flatMap(() =>
          products
            ?.filter(({ name }) => {
              const regexVar = new RegExp(search, "g");
              return name.search(regexVar) !== -1;
            })
            .map((props) => (
              <Grid item xs={6} md={4}>
                <ProductThumbnail
                  onClick={() => {
                    const allCartItems = cartItemsVar();
                    cartItemsVar([
                      ...allCartItems,
                      {
                        id: cuid(),
                        product: props,
                        amount: 1,
                      },
                    ]);
                  }}
                  {...props}
                />
              </Grid>
            ))
        )}
      </Grid>
    );
  },
  areEqual
);

export default ProductList;
