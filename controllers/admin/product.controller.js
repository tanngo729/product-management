const Product = require("../../models/product.model");

const systemconfig = require("../../config/system")
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");

// [GET] - /admin/products
module.exports.product = async (req, res) => {
  // Lấy data 
  let find = {
    deleted: false
  };
  // End

  // Bộ lọc
  const filterStatus = filterStatusHelper(req.query);
  if (req.query.status) {
    find.status = req.query.status;
  }
  // End

  // Tìm kiếm
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.name = objectSearch.regex;
  }
  // End

  // Phân trang
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 8
    },
    req.query,
    countProducts
  );
  // End 

  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render('admin/pages/product/index', {
    pageTitle: "Product",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
}

// [PATH] - /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status
  const id = req.params.id

  await Product.updateOne({ _id: id }, { status: status });

  req.flash('success', 'Cập nhật trạng thái hoạt động thành công');

  res.redirect("back");
}

// [PATH] - /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const id = req.body.ids.split(",");

  switch (type) {
    case "active":
      await Product.updateMany(
        { _id: { $in: id } },
        { status: "active" }
      );
      break;
    case "inactive":
      await Product.updateMany(
        { _id: { $in: id } },
        { status: "inactive" }
      );
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: id } },
        {
          deleted: true,
          deletedAt: new Date()
        }
      );
      break;
    case "change-position":
      for (const item of id) {
        let [id, position] = item.split("-");
        position = parseInt(position)
        await Product.updateOne(
          { _id: { $in: id } },
          {
            position: position
          }
        )
      }
      break;
    default:
      break;
  }

  res.redirect("back");
}

// [DELETE] - /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id

  await Product.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });

  res.redirect("back");
}

// [GET] - /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/product/create", {
    pageTitle: "Thêm mới sản phẩm"
  });
}

// [POST] - /admin/products/create
module.exports.createItem = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);

  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }

  const product = new Product(req.body);
  await product.save();
  req.flash('success', 'Tạo mới sản phẩm thành công');

  res.redirect(`${systemconfig.prefixAdmin}/products`);
}

// [GET] - /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }

    const product = await Product.findOne(find);

    res.render("admin/pages/product/edit", {
      pageTitle: "chỉnh sửa sản phẩm",
      product: product
    });
  } catch (error) {
    req.flash('error', "không tồn tại sản phẩm này")
    res.redirect(`${systemconfig.prefixAdmin}/products`);
  }
};

// [PATCH] - /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);

  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }

  try {
    await Product.updateOne({ _id: id }, req.body);
    req.flash('success', "Cập nhât sản phẩm thành công")
  } catch (error) {
    req.flash('error', "Cập nhât sản phẩm thất bại")
  }

  res.redirect("back");
};

module.exports.detail = async (req, res) => {
  let find = {
    deleted: false,
    _id: req.params.id
  };
  const product = await Product.findOne(find);

  res.render("admin/pages/product/detail", {
    pageTitle: "Chi tiết sản phẩm",
    product: product
  });
}