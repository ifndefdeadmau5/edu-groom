import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useQuery } from "@apollo/client";
import { GET_ALL_CART_ITEMS } from "../operations/queries/getAllCartItems";
import { ShoppingCart } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const StyledBadge = withStyles((theme: Theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

interface Props {
  children: React.ReactNode;
}

export default function Header({ children }: Props) {
  const classes = useStyles();
  const cartItemsQueryResult = useQuery(GET_ALL_CART_ITEMS, {
    onError: (e) => console.log(e),
  });
  console.log("data");
  console.log(cartItemsQueryResult);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {children}
          <IconButton aria-label="cart">
            <StyledBadge
              badgeContent={cartItemsQueryResult.data?.cartItems.length ?? 0}
              color="secondary"
            >
              <ShoppingCart />
            </StyledBadge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
