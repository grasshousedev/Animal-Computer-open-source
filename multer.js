import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, `${new Date().getTime()}---${file.originalname}`);
  },
});

export const upload = multer({ storage: storageConfig });
