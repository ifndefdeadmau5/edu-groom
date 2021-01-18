import {
  Box,
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
import ProductList from "./ProductList";

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
  const [searchDraft, setSearchDraft] = React.useState("");
  const [search, setSearch] = React.useState("");
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
      <Box display="flex" justifyContent="center" mb={4}>
        <TextField
          variant="outlined"
          label="상품명으로 검색"
          value={searchDraft}
          onChange={(e) => setSearchDraft(e.target.value)}
        />
        <Button onClick={() => setSearch(searchDraft)} variant="contained">
          조회
        </Button>
      </Box>
      <ProductList products={data?.products} search={search} />
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
