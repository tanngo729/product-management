"use strict";

module.exports = function (objectPagination, query, countProducts) {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
  var totalPage = Math.ceil(countProducts / objectPagination.limitItem);
  objectPagination.totalPage = totalPage;
  return objectPagination;
};