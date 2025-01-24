// Change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      let statusChange = statusCurrent == "active" ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    })
  });
}
// End Change-status

// Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isComfirm = confirm("bạn có chắc muốn xoá sản phẩm này");
      if (isComfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    })
  })
}
// End Delete Item

// Restore Item
const buttonRestore = document.querySelectorAll("[button-restore]");
if (buttonRestore.length > 0) {
  const formRestoreItem = document.querySelector("#form-restore-item");
  const path = formRestoreItem.getAttribute("data-path");

  buttonRestore.forEach(button => {
    button.addEventListener("click", () => {
      const isComfirm = confirm("bạn có chắc muốn khôi phục sản phẩm này");
      if (isComfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=DELETE`;
        formRestoreItem.action = action;
        formRestoreItem.submit();
      }
    })
  })
}
// End
const buttonRemove = document.querySelectorAll("[button-remove]");
if (buttonRemove.length > 0) {
  const formRemoveItem = document.querySelector("#form-remove-item");
  const path = formRemoveItem.getAttribute("data-path");

  buttonRemove.forEach(button => {
    button.addEventListener("click", () => {
      const isComfirm = confirm("bạn có chắc muốn xoá sản phẩm này");
      if (isComfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=DELETE`;
        formRemoveItem.action = action;
        formRemoveItem.submit();
      }
    })
  })
}
