import express from "express";
import { body, validationResult } from "express-validator";
import { headersImages } from "../models/headerImg.js";
import { signUpUser } from "../models/signup.js";
import bcrypt from "bcrypt";
const SECRET = process.env.SECRET || "0241";
import jwt from "jsonwebtoken";

const router = express.Router();

// 1 Router
router.get("/headers", (req, res) => {
  try {
    headersImages
      .find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Some Error Occured");
      });
  } catch (error) {
    res.status(500).send("Some Error Occured");
  }
});

// 2 Router
router.post(
  "/signup",
  [
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First Name should be at least of 3 characters"),
    body("lastName")
      .isLength({ min: 3 })
      .withMessage("Last Name should be at least of 3 characters"),
    body("email").isEmail().withMessage("Please type a valid email"),
    body("phoneNumber")
      .isLength({ min: 10 })
      .withMessage("Phone Number should be 11 integers long"),
    body("address")
      .isLength({ min: 18 })
      .withMessage("Address should be at least 18 characters long"),
    body("password1")
      .isLength({ min: 8 })
      .withMessage("must be at least 8 characters long")
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
      .withMessage(
        "Must have at least one number, one lowercase and one uppercase letter"
      ),
    body("password2").custom((value, { req }) => {
      if (value !== req.body.password1) {
        throw new Error("Password should match");
      }
      return true;
    }),
    body("seller").isIn([true, false]).withMessage("Must be a boolean value"),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const errorMsg = error.errors[0].msg;
      return res.status(400).send(errorMsg);
    }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      password2,
      seller,
    } = req.body;
    // console.log( {
    //   firstName,
    //   lastName,
    //   email,
    //   phoneNumber,
    //   address,
    //   password2,
    //   seller,
    // });
    // res.send( {
    //   firstName,
    //   lastName,
    //   email,
    //   phoneNumber,
    //   address,
    //   password2,
    //   seller,
    // })

    signUpUser.findOne({ email: email }, async (err, user) => {
      if (err) {
        return res.status(502).send("Server Error");
      } else {
        if (user) {
          return res.status(403).send("User Already Exists");
        } else {
          const salt = await bcrypt.genSalt(10);
          const securePass = await bcrypt.hash(password2, salt);
          const newUser = await new signUpUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            password: securePass,
            seller: seller,
          });
          newUser
            .save()
            .then((result) => {
              // console.log(result);
              return res.send("New Account Created");
            })
            .catch((err) => {
              console.log(err);
              res.status(402).send("Fail in creating user account");
            });
        }
      }
    });
  }
);

// 3 Router
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength(1)
      .withMessage("Password Required")
      .isLength({ min: 8 })
      .withMessage("Password should be 8 characters long"),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const errorMsg = error.errors[0].msg;
      return res.status(400).send(errorMsg);
    }
    // console.log(req.body);
    // res.send("Good");
    const { email, password } = req.body;
    signUpUser.findOne({ email: email }, (err, user) => {
      if (err) {
        return res.status(502).send("Server Error");
      } else {
        if (!user) {
          return res.status(404).send("Email not found");
        } else {
          if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
              if (err) {
                return res.status(502).send("Server Error");
              } else {
                if (result) {
                  var token = jwt.sign(
                    {
                      id: user._id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                      phoneNumber: user.phoneNumber,
                      address: user.address,
                      seller: user.seller,
                    },
                    SECRET
                  );
                  res.cookie("webTokenAlamal", token, {
                    httpOnly: true,
                    maxAge: 86400000, // 1 day age of web token
                  });
                  // console.log(token);
                  res.send(user);
                } else {
                  return res.status(404).send("Incorrect Password");
                }
              }
            });
          }
        }
      }
    });
  }
);

// 4 Router
router.post("/logout", (req, res) => {
  try {
    res.cookie("webTokenAlamal", "", {
      httpOnly: true,
    });
    res.send("GoodBye");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default router;
