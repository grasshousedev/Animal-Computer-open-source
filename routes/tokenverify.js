import express from "express";
import { signUpUser } from "../models/signup.js";

const router = express.Router();

// 1 Router
router.get("/", (req, res) => {
  signUpUser.findOne({ _id: req.body._decoded?.id }, (err, user) => {
    if (err) {
      return res.status(502).send("Server Error");
    } else {
      if (user) {
        return res.send({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          seller: user.seller,
        });
      } else {
        return res.status(401).send("UnAuthenticated user");
      }
    }
  });
});

export default router;
