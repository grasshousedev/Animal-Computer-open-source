import express from "express";
import paypal from "paypal-rest-sdk";
import { orders } from "../models/orders.js";
import path from "path";
import verifyUser from "../middleware/verifyuser.js";
const __dirname = path.resolve();

const router = express.Router();

paypal.configure({
  // mode: "sandbox", //sandbox or live
  mode: "live", //sandbox or live
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

router.post("/", verifyUser, (req, res) => {
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
      return_url: `${process.env.HOST}/api/v1/paypal/success`,
      cancel_url: `${process.env.HOST}/api/v1/paypal/cancel`,
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

router.get("/success", verifyUser, (req, res) => {
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

router.get("/cancel", verifyUser, (req, res) => {
  console.log("cancel");
  res.status(201).send({
    status: "fail",
    msg: "payment cancel",
  });
});

export default router;
