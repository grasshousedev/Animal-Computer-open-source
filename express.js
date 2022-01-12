import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { connectWithDataBase } from "./mongoDB.js";
import authRouter from "./routes/auth.js";
import verifyTokenRouter from "./routes/tokenverify.js";
import verifyUser from "./middleware/verifyuser.js";
import productRouter from "./routes/product.js";
import paypalRouter from "./routes/paypal.js";
import userRouter from "./routes/user.js";
const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 5000;

// const dev = "http://localhost:5000";
// const baseURL =
//   window.location.hostname.split(":")[0] === "localhost" ? dev : "";

dotenv.config();
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

//  route auth
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/product", productRouter);

app.use("/api/v1/tokenverify", verifyUser, verifyTokenRouter);

app.use("/api/v1/paypal", verifyUser, paypalRouter);

app.use("/api/v1/user", verifyUser, userRouter);

app.use("/**", (req, res) => {
  // res.redirect("/")
  res.sendFile(path.join(__dirname, "./web/build/index.html"));
});

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
