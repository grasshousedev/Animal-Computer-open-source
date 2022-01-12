import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET || "0241";

const verifyUser = (req, res, next) => {
  // console.log(req.cookies.webTokenAlamal);
  jwt.verify(req.cookies.webTokenAlamal, SECRET, function (err, decoded) {
    // console.log(decoded);
    req.body._decoded = decoded;
    if (!err) {
      next();
    } else {
      // res.status(401).sendFile(path.join(__dirname, "./web/"));
      // res.status(401).send("Token not verified");
      res.status(401).sendFile(path.join(__dirname, "./web/build/index.html"));
    }
  });
};

export default verifyUser;
