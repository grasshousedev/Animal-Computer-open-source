import express from "express";
import cors from "cors";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
// firebase
import storage from "./firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// file system
import { readFile } from "fs/promises";
import dotenv from "dotenv";
//  multer
import { upload } from "./multer.js";

// morgan
dotenv.config();
import morgan from "morgan";
import { unlink } from "fs/promises";
import paypal from "paypal-rest-sdk";
import path from "path";
import { connectWithDataBase } from "./mongoDB.js";
import authRouter from "./routes/auth.js";
import verifyToken from "./routes/tokenverify.js";
import verifyUser from "./middleware/verifyuser.js";
const __dirname = path.resolve();

const SECRET = process.env.SECRET || "0241";
const app = express();
const port = process.env.PORT || 5000;

// const dev = "http://localhost:5000";
// const baseURL =
//   window.location.hostname.split(":")[0] === "localhost" ? dev : "";

connectWithDataBase();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "./web/build")));

paypal.configure({
  // mode: "sandbox", //sandbox or live
  mode: "live", //sandbox or live
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});
// Database Schema
// shifted
app.use("/api/v1/auth", authRouter);

app.get("/api/v1/search/products", (req, res) => {
  console.log(req.query.search);
  sellProduct
    // .find({ title: { $regex: `/${req.query.search}/i` } })
    .find({ title: { $regex: req.query.search, $options: "i" } })
    .then((result) => {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(400).send("No Product Found");
      }
    })
    .catch((err) => {
      res.status(400).send("Server Error");
    });
});

app.get("/api/v1/special/products", (req, res) => {
  // console.log('====================================');
  // console.log(req.query);
  // console.log('====================================');
  try {
    sellProduct
      .find({ label: req.query.label })
      .then((result) => {
        // console.log(result);
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send("Error in Database");
        // console.log(err);
      });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.get("/api/v1/params/products", (req, res) => {
  // console.log('====================================');
  // console.log(req.query);
  // console.log('====================================');
  try {
    sellProduct
      .find({ productType: req.query.product_type })
      .then((result) => {
        // console.log(result);
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send("Error in Database");
        // console.log(err);
      });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.get("/api/v1/product", (req, res) => {
  try {
    // console.log(req.query[0]);
    sellProduct
      .findOne({ _id: req.query[0] })
      .then((result) => {
        // console.log(result);
        if (result) {
          res.send(result);
        } else {
          res.status(500).send("Server Error");
        }
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).send("Server Error");
      });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// app.use((req, res, next) => {
//   // console.log(req.cookies.webTokenAlamal);
//   jwt.verify(req.cookies.webTokenAlamal, SECRET, function (err, decoded) {
//     // console.log(decoded);
//     req.body._decoded = decoded;
//     if (!err) {
//       next();
//     } else {
//       // res.status(401).sendFile(path.join(__dirname, "./web/"));
//       // res.status(401).send("Token not verified");
//       res.status(401).sendFile(path.join(__dirname, "./web/build/index.html"));
//     }
//   });
// });
app.use("/api/v1/tokenverify", verifyUser, verifyToken);
// app.get("/api/v1/tokenverify", (req, res) => {
//   signUpUser.findOne({ _id: req.body._decoded?.id }, (err, user) => {
//     if (err) {
//       return res.status(502).send("Server Error");
//     } else {
//       if (user) {
//         return res.send({
//           id: user._id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           phoneNumber: user.phoneNumber,
//           address: user.address,
//           seller: user.seller,
//         });
//       } else {
//         return res.status(401).send("UnAuthenticated user");
//       }
//     }
//   });
// });

app.post("/api/v1/post/product", upload.array("myfile", 4), (req, res) => {
  try {
    var urlArray = [];
    req.files.map(async (file) => {
      // Upload file to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "productimages/" + file.filename);
      const theFile = await readFile(file.path);
      const uploadTask = uploadBytesResumable(storageRef, theFile);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
            // ...
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              console.log("File available at", downloadURL);
              urlArray.push(downloadURL);
              if (urlArray.length === req.files.length) {
                try {
                  req.files.map(async (file) => {
                    await unlink(file.path);
                  });
                  const newProduct = await new sellProduct({
                    authorId: req.body.authorId,
                    authorName: req.body.authorName,

                    title: req.body.title,
                    description: req.body.description,
                    brand: req.body.brand,
                    color: req.body.color,
                    productType: req.body.productType,
                    processorName: req.body.processorName,
                    processorDetail: req.body.processorDetail,
                    price: req.body.price,
                    display: req.body.display,
                    displayDetails: req.body.displayDetails,
                    ram: req.body.ram,
                    storage: req.body.storage,
                    label: req.body.label,
                    imageURL1: urlArray[0],
                    imageURL2: urlArray[1],
                    imageURL3: urlArray[2],
                    imageURL4: urlArray[3],
                  });
                  newProduct
                    .save()
                    .then((result) => {
                      res.send("Post Created");
                    })
                    .catch((err) => {
                      res.status(500).send("Server Error");
                    });
                } catch (error) {
                  res.status(500).send("Server Error");
                }
              }
            })
            .catch((err) => {
              res.status(500).send("Server Error");
            });
        }
      );
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.post("/api/v1/paypal", (req, res) => {
  // console.log(req.body);
  global.order = req.body;
  // console.log(order);
  // var {
  //   deliveryAddress,
  //   firstName,
  //   googleLocation,
  //   lastName,
  //   phoneNumber,
  //   total,
  //   arrayOfCart,
  // } = req.body;
  // const { price } = req.body;
  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      // return_url: `${baseURL}/success`,
      // cancel_url: `${baseURL}/cancel`,
      return_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/cancel`,
      // return_url: `${port}/success`,
      // cancel_url: `:${port}/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price: "2",
              currency: "USD",
              quantity: "1",
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "2",
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.status(500).send("Paypal Error Occured");
      console.log(error);
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          // res.redirect(payment.links[i].href);
          res.status(201).send({
            status: "success",
            link: payment.links[i].href,
          });
        }
      }
    }
  });
});

app.get("/success", (req, res) => {
  console.log(req.query);
  var paymentId = req.query.paymentId;
  var payerId = { payer_id: req.query.PayerID };

  paypal.payment.execute(paymentId, payerId, function (error, payment) {
    if (error) {
      console.error(JSON.stringify(error));
    } else {
      if (payment.state == "approved") {
        //console.log(JSON.stringify(payment, null, '\t'));
        console.log("payment completed successfully");
        // res.status(201).send({
        //   status: "success",
        //   payment: payment,
        // });
        // res.send("<h1>Payment Completed Successfully")
        console.log(order);
        try {
          const newOrder = new orders({
            deliveryAddress: order.deliveryAddress,
            firstName: order.firstName,
            googleLocation: order.googleLocation,
            lastName: order.lastName,
            phoneNumber: order.phoneNumber,
            total: order.total,
            clientId: req.body._decoded.id,
            arrayOfCart: order.arrayOfCart,
            status: "pending",
          });
          newOrder.save((err, data) => {
            if (err) {
              return res.status(500).send("Internal Server Error");
            } else {
              if (data) {
                // return res.send(data);
                res.sendFile(path.join(__dirname, "./web/build/index.html"));
              } else {
                return res.status(500).send("Data Not Found");
              }
            }
          });
        } catch (error) {
          return res.status(500).send("Internal Server Error");
        }
        // res.sendFile(path.join(__dirname, "./web/build/index.html"));
        // res.send('Success');
      } else {
        res.status(400).send({
          status: "payment not successful",
          payment: {},
        });
      }
    }
  });
});

app.get("/cancel", (req, res) => {
  console.log("cancel");
  res.status(201).send({
    status: "fail",
    msg: "payment cancel",
  });
});

app.get("/api/v1/user/orders", (req, res) => {
  try {
    orders
      .find({ clientId: req.body._decoded.id })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send("Server Error");
      });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.post("/api/v1/changestatus", (req, res) => {
  try {
    const { orderId } = req.body;
    orders
      .findOne({ _id: orderId })
      .then((result) => {
        result
          .updateOne({ status: "completed" })
          .then((data) => {
            res.send("completed");
          })
          .catch((err) => {
            res.status(500).send("Server Error");
          });
      })
      .catch((err) => {
        res.status(500).send("Server Error");
      });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.get("/api/v1/getclientorders", (req, res) => {
  try {
    // console.log(req.body._decoded.id);
    orders
      .find({ arrayOfCart: { $elemMatch: { authorId: req.body._decoded.id } } })
      .then((data) => {
        // console.log(data);
        res.send(data);
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).send("Server Error");
      });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
app.get("/api/v1/getsellerproducts", (req, res) => {
  try {
    // console.log(req.body._decoded.id);
    sellProduct
      .find({ authorId: req.body._decoded.id })
      .then((data) => {
        // console.log(data);
        res.send(data);
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).send("Server Error");
      });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.post("/api/v1/user/update", (req, res) => {
  try {
    // console.log(req.body);
    signUpUser
      .findByIdAndUpdate(req.body._decoded.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
      })
      .then((result) => {
        if (result) {
          // console.log(result);
          // res.send(result);
          // As i know that it is given me the previous object which is updated so finding once againz
          signUpUser
            .findOne({ _id: req.body._decoded.id })
            .then((data) => {
              if (data) {
                res.send(data);
              } else {
                res.status(500).send("Server Error");
              }
            })
            .catch((err) => {
              res.status(500).send("Server Error");
            });
        } else {
          res.status(500).send("Server Error");
        }
      })
      .catch((err) => {
        res.status(500).send("Server Error");
      });
    // console.log(req.body);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
app.post("/api/v1/user/passwordupdate", (req, res) => {
  try {
    if (req.body.new_password1 !== req.body.new_password2) {
      return res.status(401).send("Both new password should match");
    }
    // console.log(req.body);
    signUpUser
      .findOne({ _id: req.body._decoded.id })
      .then(async (user) => {
        if (user) {
          bcrypt.compare(
            req.body.old_password.toString(),
            user.password,
            async (err, result) => {
              if (err) {
                res.status(500).send("Server Error");
              } else {
                if (result) {
                  // console.log(result);
                  const salt = await bcrypt.genSalt(10);
                  const newHashPass = await bcrypt.hash(
                    req.body.new_password1,
                    salt
                  );
                  signUpUser.findByIdAndUpdate(
                    req.body._decoded.id,
                    {
                      password: newHashPass,
                    },
                    (err, user) => {
                      if (err) {
                        res.status(500).send("Server Error");
                      } else {
                        if (user) {
                          // console.log(user);
                          res.send(user);
                        } else {
                          res.status(403).send("can't update new password");
                        }
                      }
                    }
                  );
                } else {
                  // console.log(result, "wrong password");
                  res.status(403).send("Wrong password");
                }
              }
            }
          );
        } else {
          // console.log("user not found");
          res.status(402).send("user not found");
        }
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).send("Server Error");
      });
  } catch (error) {
    // console.log(error);
    res.status(500).send("Server Error");
  }
});

app.use("/**", (req, res) => {
  // res.redirect("/")
  res.sendFile(path.join(__dirname, "./web/build/index.html"));
});

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
