// import React, { useState } from "react";
// import { useFormik } from "formik";
// // import * as yup from "yup";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import { Container, InputLabel, MenuItem, Select } from "@material-ui/core";
// import axios from "axios";
// import { useSelector } from "react-redux";

// // const validationSchema = yup.object({
// //   email: yup
// //     .string("Enter your email")
// //     .email("Enter a valid email")
// //     .required("Email is required"),
// //   password: yup
// //     .string("Enter your password")
// //     .min(8, "Password should be of minimum 8 characters length")
// //     .required("Password is required"),
// // });

// function Seller() {
//   const state = useSelector((state) => state.auth.token);
//   const dev = "http://localhost:5000";
//   const baseURL =
//     window.location.hostname.split(":")[0] === "localhost" ? dev : "";

//   const [productImages, setProductImages] = useState([]);
//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       description: "",
//       brand: "",
//       color: "",
//       productType: "Laptop",
//       processorName: "",
//       processorDetail: "",
//       price: "",
//       display: "",
//       displayDetails: "",
//       ram: "",
//       storage: "",
//       label: "Featured",
//     },
//     // initialValues: {
//     //   title: "Macbook Air 13",
//     //   description: `The Apple MacBook Air "Core i5" 1.6 13-Inch (Early 2015/Broadwell) features a 14-nm "Broadwell ULT" 1.6 GHz Intel "Core i5" processor (5250U) with two independent processor "cores" on a single chip, a 3 MB shared level 3 cache, 4 GB or 8 GB of onboard 1600 MHz LPDDR3 SDRAM (4 GB of RAM originally with the option to upgrade to 8 GB at the time of purchase only, and 8 GB standard starting April 19, 2016), 128 GB or 256 GB of 4 Lane PCIe-based flash storage, and an "integrated" Intel HD Graphics 60`,
//     //   brand: "Apple",
//     //   color: "white",
//     //   productType: "Laptop",
//     //   processorName: "Core i5",
//     //   processorDetail: `5250U`,
//     //   price: "600",
//     //   display: "13.3",
//     //   displayDetails: `TFT LED backlit active-matrix "glossy" display (1440x900 native resolution)`,
//     //   ram: "8GB DDR3 RAM ",
//     //   storage: " 1000GB HDD STORAGE",
//     //   label: "Featured",
//     // },
//     // validationSchema: validationSchema,
//     onSubmit: (values) => {
//       // console.log(productImages);
//       // if (productImages.length < 4 || productImages.length > 4) {
//       //   return console.log("four pictures are required");
//       // }
//       // alert(JSON.stringify(values, null, 2));
//       // console.log({values});
//       // console.log(productImages);
//       // setProductImages([]);
//       // productImages.map((element) => {
//       //   console.log(element);
//       // })
//       var formData = new FormData();
//       for (let i = 0; i < productImages.length; i++) {
//         formData.append("myfile", productImages[i]);
//       }
//       formData.append("authorId", state.id);
//       formData.append("authorName", state.firstName + " " + state.lastName);
//       formData.append("title", values.title);
//       formData.append("description", values.description);
//       formData.append("brand", values.brand);
//       formData.append("color", values.color);
//       formData.append("productType", values.productType);
//       formData.append("processorName", values.processorName);
//       formData.append("processorDetail", values.processorDetail);
//       formData.append("price", values.price);
//       formData.append("display", values.display);
//       formData.append("displayDetails", values.displayDetails);
//       formData.append("ram", values.ram);
//       formData.append("storage", values.storage);
//       formData.append("label", values.label);

//       // console.log(formData);
//       axios({
//         method: "post",
//         url: `${baseURL}/api/v1/post/product`,
//         // url: `http://localhost:5000/api/v1/post/product`,
//         data: formData,
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       })
//         .then((result) => {
//           console.log(result.data);
//         })
//         .catch((err) => {
//           console.log(err.response.data);
//         });
//     },
//   });

//   return (
//     <Container>
//       <h1>Sell your Laptops</h1>
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           fullWidth
//           id="title"
//           name="title"
//           label="Title"
//           value={formik.values.title}
//           onChange={formik.handleChange}
//           error={formik.touched.title && Boolean(formik.errors.title)}
//           helperText={formik.touched.title && formik.errors.title}
//           placeholder="Macbook Air 13"
//           required
//         />
//         <TextField
//           fullWidth
//           id="description"
//           name="description"
//           label="Title Descrpition"
//           value={formik.values.description}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.description && Boolean(formik.errors.description)
//           }
//           helperText={formik.touched.description && formik.errors.description}
//           placeholder="The Apple MacBook Air Core i5 1.6 13-Inch (Early 2015/Broadwell) features a 14-nm Broadwell ULT 1.6 GHz Intel Core i5 processor (5250U) with two independent processor cores on a single chip, a 3 MB shared level 3 cache, 4 GB or 8 GB of onboard 1600 MHz LPDDR3 SDRAM (4 GB of RAM originally with the option to upgrade to 8 GB at the time of purchase only, and 8 GB standard starting April 19, 2016), 128 GB or 256 GB of 4 Lane PCIe-based flash storage, and an integrated Intel HD Graphics 60"
//           required
//         />
//         <TextField
//           fullWidth
//           id="brand"
//           name="brand"
//           label="Brand Name"
//           value={formik.values.brand}
//           onChange={formik.handleChange}
//           error={formik.touched.brand && Boolean(formik.errors.brand)}
//           helperText={formik.touched.brand && formik.errors.brand}
//           required
//           placeholder="Apple"
//         />
//         <TextField
//           fullWidth
//           id="color"
//           name="color"
//           label="Laptop color"
//           value={formik.values.color}
//           onChange={formik.handleChange}
//           error={formik.touched.color && Boolean(formik.errors.color)}
//           helperText={formik.touched.color && formik.errors.color}
//           required
//           placeholder="white"
//         />
//         <TextField
//           fullWidth
//           id="productType"
//           name="productType"
//           label="Product Type"
//           value={formik.values.productType}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.productType && Boolean(formik.errors.productType)
//           }
//           helperText={formik.touched.productType && formik.errors.productType}
//           required
//         />
//         <TextField
//           fullWidth
//           id="processorName"
//           name="processorName"
//           label="Processor Name"
//           value={formik.values.processorName}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.processorName && Boolean(formik.errors.processorName)
//           }
//           helperText={
//             formik.touched.processorName && formik.errors.processorName
//           }
//           required
//           placeholder="Core i5"
//         />
//         <TextField
//           fullWidth
//           id="processorDetail"
//           name="processorDetail"
//           label="Processor Details"
//           value={formik.values.processorDetail}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.processorDetail &&
//             Boolean(formik.errors.processorDetail)
//           }
//           helperText={
//             formik.touched.processorDetail && formik.errors.processorDetail
//           }
//           required
//           placeholder="5250U"
//         />
//         <TextField
//           fullWidth
//           id="price"
//           name="price"
//           label="Price"
//           type="number"
//           value={formik.values.price}
//           onChange={formik.handleChange}
//           error={formik.touched.price && Boolean(formik.errors.price)}
//           helperText={formik.touched.price && formik.errors.price}
//           required
//           placeholder="600"
//         />
//         <TextField
//           fullWidth
//           id="display"
//           name="display"
//           label="Display"
//           type="number"
//           value={formik.values.display}
//           onChange={formik.handleChange}
//           error={formik.touched.display && Boolean(formik.errors.display)}
//           helperText={formik.touched.display && formik.errors.display}
//           required
//           placeholder="13.3"
//         />
//         <TextField
//           fullWidth
//           id="displayDetails"
//           name="displayDetails"
//           label="Display Details"
//           value={formik.values.displayDetails}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.displayDetails &&
//             Boolean(formik.errors.displayDetails)
//           }
//           helperText={
//             formik.touched.displayDetails && formik.errors.displayDetails
//           }
//           required
//           placeholder="TFT LED backlit active-matrix glossy display (1440x900 native resolution)"
//         />
//         <TextField
//           fullWidth
//           id="ram"
//           name="ram"
//           label="RAM"
//           value={formik.values.ram}
//           onChange={formik.handleChange}
//           error={formik.touched.ram && Boolean(formik.errors.ram)}
//           helperText={formik.touched.ram && formik.errors.ram}
//           required
//           placeholder="8GB DDR3 RAM"
//         />
//         <TextField
//           fullWidth
//           id="storage"
//           name="storage"
//           label="Storage"
//           value={formik.values.storage}
//           onChange={formik.handleChange}
//           error={formik.touched.storage && Boolean(formik.errors.storage)}
//           helperText={formik.touched.storage && formik.errors.storage}
//           required
//           placeholder="1000GB HDD STORAGE"
//         />
//         <InputLabel id="label">Label</InputLabel>
//         <Select
//           labelId="label"
//           id="label"
//           name="label"
//           label="Label"
//           defaultValue="Featured"
//           value={formik.values.label}
//           onChange={formik.handleChange}
//           fullWidth
//           required
//         >
//           <MenuItem value="Featured">Featured</MenuItem>
//           <MenuItem value="New">New</MenuItem>
//         </Select>
//         <input
//           type="file"
//           accept="image/*"
//           name="file"
//           id="file"
//           multiple
//           onChange={(e) => {
//             setProductImages([]);
//             for (let i = 0; i < e.target.files.length; i++) {
//               const newImage = e.target.files[i];
//               setProductImages((prevImage) => [...prevImage, newImage]);
//             }
//           }}
//           required
//         />
//         <Button color="primary" variant="contained" fullWidth type="submit">
//           Submit
//         </Button>
//       </form>
//     </Container>
//   );
// }

// export default Seller;
