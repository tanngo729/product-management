"use strict";

// Change-status
var buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus.length > 0) {
  var formChangeStatus = document.querySelector("#form-change-status");
  var path = formChangeStatus.getAttribute("data-path");
  buttonChangeStatus.forEach(function (button) {
    button.addEventListener("click", function () {
      var statusCurrent = button.getAttribute("data-status");
      var id = button.getAttribute("data-id");
      var statusChange = statusCurrent == "active" ? "inactive" : "active";
      var action = path + "/".concat(statusChange, "/").concat(id, "?_method=PATCH");
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
} // End Change-status
// Delete Item


var buttonDelete = document.querySelectorAll("[button-delete]");

if (buttonDelete.length > 0) {
  var formDeleteItem = document.querySelector("#form-delete-item");

  var _path = formDeleteItem.getAttribute("data-path");

  buttonDelete.forEach(function (button) {
    button.addEventListener("click", function () {
      var isComfirm = confirm("bạn có chắc muốn xoá sản phẩm này");

      if (isComfirm) {
        var id = button.getAttribute("data-id");
        var action = "".concat(_path, "/").concat(id, "?_method=DELETE");
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
} // End Delete Item