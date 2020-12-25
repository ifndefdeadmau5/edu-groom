import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import DailyInteger from "../components/DailyInteger";
import { useReactiveVar } from "@apollo/client";
import { cartItemsVar } from "../cache";
import { CartItem } from "../models/cartItems";

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  heading: {
    fontWeight: 900,
    fontSize: "1.75rem",
    textAlign: "center",
    [breakpoints.up("sm")]: {
      textAlign: "left",
    },
    [breakpoints.up("md")]: {
      fontSize: "2.25rem",
    },
  },
  table: {
    minWidth: 650,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  name: {
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif",
    fontWeight: "bold",
    fontSize: 16,
    margin: "0 0 8px 0",
  },
  descr: {
    fontSize: 14,
    color: palette.text.secondary,
  },
}));

const DailyCart = () => {
  const styles = useStyles();

  const cartItems = useReactiveVar(cartItemsVar);

  const itemsObj = cartItems.reduce((acc, item) => {
    const {
      product: { id },
    } = item;
    if (acc[id]) {
      acc[id].amount += 1;
    } else {
      acc[id] = { ...item };
    }

    return acc;
  }, {} as Record<string, CartItem>);

  return (
    <Box pt={{ xs: 2, sm: 4, md: 6 }}>
      <Typography className={styles.heading} variant={"h1"} gutterBottom>
        Shopping Cart.
      </Typography>
      <TableContainer>
        <Table className={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(itemsObj).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Box display={"flex"} alignItems={"center"}>
                    <Box width={80} height={80}>
                      <img
                        className={styles.image}
                        alt={row.product.name}
                        src={row.product.imgUrl}
                      />
                    </Box>
                    <Box ml={2}>
                      <p className={styles.name}>{row.product.name}</p>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <DailyInteger>{row.amount}</DailyInteger>
                </TableCell>
                <TableCell>{Number(row.product.price) * row.amount}</TableCell>
                <TableCell>
                  <IconButton>
                    <Close />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DailyCart;
