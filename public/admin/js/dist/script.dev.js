"use strict";

// button status
var buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
  var url = new URL(window.location.href);
  buttonStatus.forEach(function (button) {
    button.addEventListener("click", function () {
      var status = button.getAttribute('button-status');

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams["delete"]("status");
      } // console.log(url);


      window.location.href = url.href;
    });
  });
} // End
// Tìm kiếm


var formSearch = document.querySelector("#form-search");

if (formSearch) {
  var _url = new URL(window.location.href);

  formSearch.addEventListener("submit", function (e) {
    e.preventDefault();
    var keyword = e.target.elements.keyword.value;

    if (keyword) {
      _url.searchParams.set("keyword", keyword);
    } else {
      _url.searchParams["delete"]("keyword");
    }

    window.location.href = _url.href;
  });
} // end
// Phân trang


var buttonPagination = document.querySelectorAll("[button-pagination]");

if (buttonPagination) {
  var _url2 = new URL(window.location.href);

  buttonPagination.forEach(function (button) {
    button.addEventListener('click', function () {
      var page = button.getAttribute("button-pagination");

      _url2.searchParams.set("page", page);

      window.location.href = _url2.href;
    });
  });
} // end
// Thay đổi trạng thái


var checkboxMulti = document.querySelector("[checkbox-multi]");

if (checkboxMulti) {
  var inputCheckAll = checkboxMulti.querySelector("input[name='check-all']");
  var inputIds = checkboxMulti.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click", function () {
    if (inputCheckAll.checked) {
      inputIds.forEach(function (input) {
        input.checked = true;
      });
    } else {
      inputIds.forEach(function (input) {
        input.checked = false;
      });
    }
  });
  inputIds.forEach(function (input) {
    input.addEventListener("click", function () {
      var countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

      if (countChecked == inputIds.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
} // Form thay đổi trạng thái nhiều


var formChangeMulti = document.querySelector("[form-change-multi]");

if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", function (e) {
    e.preventDefault();
    var checkboxMulti = document.querySelector("[checkbox-multi]");
    var inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

    if (inputChecked.length > 0) {
      var ids = [];

      var _inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputChecked.forEach(function (input) {
        var id = input.value;
        ids.push(id);
      });
      _inputIds.value = ids.join(",");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một mục");
    }
  });
}