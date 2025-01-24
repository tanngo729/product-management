const express = require('express');
const router = express.Router();
const multer = require('multer');
const storagemulter = require('../../helper/storageMulter');
const upload = multer({ storage: storagemulter() });
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validate/admin/product.validate");

router.get('/', controller.product);

router.patch(`/change-status/:status/:id`, controller.changeStatus);
router.patch(`/change-multi`, controller.changeMulti);

router.delete(`/delete/:id`, controller.deleteItem);
router.get(`/create`, controller.create);
router.post(`/create`,
  upload.single('image'),
  validate.createPost,
  controller.createItem);
router.get(`/edit/:id`, controller.edit);
router.patch(`/edit/:id`,
  upload.single('image'),
  validate.createPost,
  controller.editPatch);
router.get(`/detail/:id`, controller.detail);

module.exports = router;