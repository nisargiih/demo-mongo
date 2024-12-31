const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  custom_error_response,
  error_response,
} = require("../utils/common.response");

const file_path = {
  category_img: "uploads/category",
  product_img: "uploads/product",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, file_path[file.fieldname]);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname).toLowerCase());
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const file_type = /jpeg|jpg|png/;
    const ext_name = file_type.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mime_type = file_type.test(file.mimetype);

    if (ext_name && mime_type) {
      return cb(null, true);
    } else {
      return cb(new Error("Please uplaod jpeg,jpg and png file only"));
    }
  },
});

const upload_category_img = (req, res, next) => {
  const upload_category = upload.single("category_img");

  upload_category(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return custom_error_response(res, "File size should be less than 2 MB");
      } else {
        return custom_error_response(res, err.message || "File upload error");
      }
    }

    if (req.file) {
      req.local = req.file.path;
    }

    next();
  });
};

const upload_product_img = (req, res, next) => {
  const upload_product = upload.array("product_img", 4);

  upload_product(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return custom_error_response(res, "File size should be less than 2 MB");
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return custom_error_response(res, "Please upload only 4 photes ");
      } else {
        return custom_error_response(res, err.message || "File upload error");
      }
    }

    if (req.file) {
      req.local = req.files;
    }
    next();
  });
};

const revert_uploaded_file_if_error = (req, res, next) => {
  if (req?.local) {
    fs.unlink(req.local, (err) => {
      if (err) {
        return custom_error_response(res, "Something went wrong", 500);
      }
    });
  }

  if (req?.error_message === "EXIST") {
    return custom_error_response(res, "Category alredy exist");
  }

  return error_response(res, error);
};

// const revert_uploaded_product_img_if_error = (req,res,next) => {
//   if(req?.local){
//     fs.unlink(req.local, (err) => {
//       if (err) {
//         return custom_error_response(res, "Something went wrong", 500);
//       }
//     });
//   }
// }
module.exports = {
  upload_category_img,
  revert_uploaded_file_if_error,
  upload_product_img,
};
