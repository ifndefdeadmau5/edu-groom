import {
  Button,
  Container,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import cuid from "cuid";
import React from "react";
import { cartItemsVar } from "../cache";
import ProductThumbnail from "../components/ProductThumbnail";
import {
  useGetProductsQuery,
  useAddProductMutation,
} from "../generated/graphql";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(7),
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  })
);

export default function Products() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", price: "", imgUrl: "" });
  const { name, price, imgUrl } = form;
  const { data, loading, error } = useGetProductsQuery();
  const [addProduct, { loading: mutationLoading }] = useAddProductMutation({
    onCompleted: () => {
      setOpen(false);
    },
    refetchQueries: ["GetProducts"],
  });

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{`Error! ${error.message}`}</span>;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    addProduct({
      variables: form,
    });
  };

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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">상품 추가하기</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <code>{JSON.stringify(form)}</code>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="상품명"
            fullWidth
            value={name}
            onChange={handleTextChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="가격"
            fullWidth
            value={price}
            onChange={handleTextChange}
          />
          <TextField
            margin="dense"
            name="imgUrl"
            label="썸네일 이미지 주소"
            fullWidth
            value={imgUrl}
            onChange={handleTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <Add />
      </Fab>
    </Container>
  );
}
