"use strict";

module.exports = function (query) {
  var filterStatus = [{
    name: "Tât cả",
    status: "",
    "class": ""
  }, {
    name: "Đang hoạt động",
    status: "active",
    "class": ""
  }, {
    name: "Dừng hoạt động",
    status: "inactive",
    "class": ""
  }];

  if (query.status) {
    var index = filterStatus.findIndex(function (item) {
      return item.status == query.status;
    });
    filterStatus[index]["class"] = "active";
  } else {
    var _index = filterStatus.findIndex(function (item) {
      return item.status == "";
    });

    filterStatus[_index]["class"] = "active";
  }

  return filterStatus;
};