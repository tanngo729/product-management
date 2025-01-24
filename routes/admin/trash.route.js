const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/trash.controller");

router.get('/', controller.product);
router.delete('/restore/:id', controller.restore);
router.patch(`/restore-multi`, controller.restoreMulti);
router.delete('/remove/:id', controller.removeItem);


module.exports = router;