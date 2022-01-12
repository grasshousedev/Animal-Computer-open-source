import React, { useState } from "react";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";
import { showError } from "../../../utils";
import Alert from "@material-ui/lab/Alert";

function AccessoryForm() {
  const state = useSelector((state) => state.auth.token);
  const dev = "http://localhost:5000";
  const baseURL =
    window.location.hostname.split(":")[0] === "localhost" ? dev : "";
  const [myAlert, setMyAlert] = useState({
    saving: false,
    success: null,
    error: null,
    message: null,
  });
  const [productImages, setProductImages] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      brand: "",
      description: "",
      color: "",
      productType: "Accessory",
      price: "",
    },

    onSubmit: (values, { resetForm }) => {
      if (productImages.length > 4 || productImages.length < 4) {
        let err = {
          response: {
            data: "4 pictures required",
          },
        };
        return setMyAlert({
          ...myAlert,
          saving: false,
          success: false,
          error: true,
          message: err,
        });
      }
      var formData = new FormData();
      for (let i = 0; i < productImages.length; i++) {
        formData.append("myfile", productImages[i]);
      }
      formData.append("authorId", state.id);
      formData.append("authorName", state.firstName + " " + state.lastName);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("brand", values.brand);
      formData.append("color", values.color);
      formData.append("productType", "Accessory");
      formData.append("price", values.price);

      setMyAlert({
        ...myAlert,
        saving: true,
      });

      axios({
        method: "post",
        url: `${baseURL}/api/v1/post/product`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
        .then((result) => {
          setMyAlert({
            saving: false,
            success: true,
          });
          resetForm({ values: "" });
        })
        .catch((err) => {
          setMyAlert({
            ...myAlert,
            saving: false,
            success: false,
            error: true,
            message: err,
          });
        });
    },
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (myAlert.success === true) {
      setMyAlert({
        ...myAlert,
        success: false,
      });
    } else {
      setMyAlert({
        ...myAlert,
        error: false,
      });
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={myAlert.success}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Product Created Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={myAlert.error}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {showError(myAlert.message)}
        </Alert>
      </Snackbar>
      <Container>
        <Typography variant="h5" component="h5">
          Sell Accessories
        </Typography>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                variant="outlined"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                placeholder="Keyboard"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="brand"
                name="brand"
                label="Brand Name"
                variant="outlined"
                value={formik.values.brand}
                onChange={formik.handleChange}
                error={formik.touched.brand && Boolean(formik.errors.brand)}
                helperText={formik.touched.brand && formik.errors.brand}
                required
                placeholder="Dell"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Title Descrpition"
                variant="outlined"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                placeholder="Dell new wireless Keyboard with USB connectivity "
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="color"
                name="color"
                label="Accessory color"
                variant="outlined"
                value={formik.values.color}
                onChange={formik.handleChange}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
                required
                placeholder="Dark Black"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="productType"
                name="productType"
                label="Product Type"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                value={formik.values.productType}
                onChange={formik.handleChange}
                error={
                  formik.touched.productType &&
                  Boolean(formik.errors.productType)
                }
                helperText={
                  formik.touched.productType && formik.errors.productType
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                type="number"
                variant="outlined"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                required
                placeholder="30"
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <input
                type="file"
                accept="image/*"
                name="file"
                id="file"
                variant="outlined"
                multiple
                style={{
                  marginTop: "20px",
                  marginBottom: "14px",
                  width: "100%",
                }}
                onChange={(e) => {
                  setProductImages([]);
                  for (let i = 0; i < e.target.files.length; i++) {
                    const newImage = e.target.files[i];
                    setProductImages((prevImage) => [...prevImage, newImage]);
                  }
                }}
                required
              />
            </Grid>
            <Button color="primary" variant="contained" fullWidth type="submit">
              {myAlert.saving ? (
                <CircularProgress color="secondary" />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default AccessoryForm;
