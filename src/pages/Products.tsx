import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import cuid from "cuid";
import React from "react";
import { cartItemsVar } from "../cache";
import ProductThumbnail from "../components/ProductThumbnail";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(7),
    },
  })
);

const products = [...Array(10)].map(() => ({
  name: "고구마",
  price: "1000",
  imgUrl:
    "https://mblogthumb-phinf.pstatic.net/MjAxNzA5MTFfOTUg/MDAxNTA1MDkwOTQ4Nzkx.d6WmUQbJNVn_AgreyvKeQVnSTLnlzHFJsi4lWdgsTr0g.2BA8M9s7-eZEwkJZ5SJ6uVYD4g3kCAXUuQYOZtw1Uusg.PNG.nong-up/image.png?type=w800",
}));
export default function Products() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container justify="center" spacing={2}>
        {products.map((props) => (
          <Grid item xs={6} md={4}>
            <ProductThumbnail
              onClick={() => {
                const allCartItems = cartItemsVar();
                cartItemsVar([
                  ...allCartItems,
                  {
                    id: cuid(),
                    product: { ...props, id: cuid() },
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
