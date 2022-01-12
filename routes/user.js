import express from "express";
import { orders } from "../models/orders.js";
import { signUpUser } from "../models/signup.js";
import bcrypt from "bcrypt";
import { sellProduct } from "../models/product.js";

const router = express.Router();

router.get("/orders", (req, res) => {
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

router.post("/changestatus", (req, res) => {
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

router.get("/getclientorders", (req, res) => {
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

router.get("/getsellerproducts", (req, res) => {
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

router.post("/update", (req, res) => {
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

router.post("/passwordupdate", (req, res) => {
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

export default router;
