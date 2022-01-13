import express from "express";
import verifyUser from "../middleware/verifyuser.js";
import { sellProduct } from "../models/product.js";
import { upload } from "../multer.js";
import { readFile, unlink } from "fs/promises";
import storage from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const router = express.Router();

// 1 Router
router.get("/", (req, res) => {
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

// 2 Router
router.get("/search/products", (req, res) => {
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

// 3 Router
router.get("/special/products", (req, res) => {
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

// 4 Router
router.get("/params/products", (req, res) => {
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

// 5 Router
router.post(
  "/post/product",
  verifyUser,
  upload.array("myfile", 4),
  (req, res) => {
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
  }
);

export default router;
