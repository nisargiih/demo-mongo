const { create_category, update_category, delete_category, all_category } = require("../controller/category.controller")
const upload = require("../middleware/multer.middleware")

const route = require("express").Router()

route.get("/get-category", all_category)
route.post("/create-category", upload.upload_category_img, create_category,upload.revert_uploaded_file_if_error)
route.put("/update-category", update_category)
route.delete("/delete-category/:_id", delete_category)

module.exports = route
