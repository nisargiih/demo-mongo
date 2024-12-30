const Category = require("../model/category.model");
const {
  error_response,
  success_message,
  custom_error_response,
  success_response,
} = require("../utils/common.response");
const fs = require("fs");

const create_category = async (req, res, next) => {
  try {
    const { category_name } = req.body;
    const check_if_category_exist = await Category.findOne({ category_name });

    if (check_if_category_exist) {
      req.error_message = "EXIST";
      return next();
    }

    const payload = {
      category_name: category_name,
    };

    if (req?.file) {
      payload.category_img = req.file.path;
    }
    await Category.create(payload);

    return success_message(res, "Category created successfully");
  } catch (error) {
    next();
  }
};

const update_category = async (req, res, next) => {
  try {
    const { category_name, _id } = req.body;
    const check_if_category_exist = await Category.findOne({
      category_name,
      _id: {
        $ne: _id,
      },
    });

    if (check_if_category_exist) {
      req.error_message = "EXIST";
      return next();
    }

    const find_previous_category = await Category.findById(_id);

    const payload = {
      category_name: category_name,
    };

    if (req?.file) {
      payload.category_img = req?.file?.path;
    } else {
      payload.category_img = null;
    }

    await Category.updateOne(
      { _id },
      {
        $set: payload,
      }
    );
    if (find_previous_category?.category_img && req?.file) {
      fs.unlink(find_previous_category.category_img, (err) => {
        if (err) {
          return custom_error_response(res, "Something went wrong", 500);
        }
      });
    }
    return success_message(res, "Category updated successfully");
  } catch (error) {
    return error_response(res, error);
  }
};

const delete_category = async (req, res) => {
  try {
    const { _id } = req.params;
    const find_previous_category = await Category.findById(_id);

    if (find_previous_category?.category_img) {
      fs.unlink(find_previous_category.category_img, (err) => {
        if (err) {
          return custom_error_response(
            res,
            err?.message ?? "Something went wrong",
            500
          );
        }
      });
    }
    await Category.findByIdAndDelete(_id);

    return success_message(res, "Category deleted successfully");
  } catch (error) {
    return error_response(res, error);
  }
};

const all_category = async (req, res) => {
  try {
    const { limit = 10, search, page = 1, _id } = req.body;

    const offset = (page - 1) * limit;

    let category = null;
    if (_id) {
      category = await Category.findById(_id);
    } else {
      const payload = {};
      if (search) {
        payload.category_name = {
          $regex: search,
        };
      }
      category = await Category.find(payload).limit(limit).skip(offset);
    }

    return success_response(res, "", { data: category });
  } catch (error) {
    return error_response(res, error);
  }
};
module.exports = {
  create_category,
  update_category,
  delete_category,
  all_category,
};
