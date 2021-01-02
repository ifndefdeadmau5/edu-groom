import { Container, createStyles, Grid, makeStyles } from "@material-ui/core";
import cuid from "cuid";
import React from "react";
import { cartItemsVar } from "../cache";
import ProductThumbnail from "../components/ProductThumbnail";
import { useGetProductsQuery } from "../generated/graphql";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(7),
    },
  })
);

export default function Products() {
  const classes = useStyles();
  const { data, loading, error } = useGetProductsQuery();

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{`Error! ${error.message}`}</span>;

  return (
    <Container className={classes.root}>
      <Grid container justify="center" spacing={2}>
        {data?.products.map((props) => (
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
        ))}
      </Grid>
    </Container>
  );
}
