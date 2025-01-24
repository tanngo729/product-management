// button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute('button-status');
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      // console.log(url);
      window.location.href = url.href;
    });
  });
}
// End

// Tìm kiếm
const formSearch = document.querySelector("#form-search")
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  })
}
// end

// Phân trang
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);

  buttonPagination.forEach(button => {
    button.addEventListener('click', () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);

      window.location.href = url.href;
    })
  });
}
// end

// Thay đổi trạng thái
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='check-all']");
  const inputIds = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputIds.forEach(input => {
        input.checked = true;
      });
    } else {
      inputIds.forEach(input => {
        input.checked = false;
      });
    }
  });

  inputIds.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

      if (countChecked == inputIds.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    })
  });
}

// Form thay đổi trạng thái nhiều
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

    const typeChange = e.target.elements.type.value;

    if (typeChange == "delete-all") {
      const isConfirm = confirm("bạn có chắc muốn xoá những sản phẩm này?");

      if (!isConfirm) {
        return;
      }
    }

    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputChecked.forEach(input => {
        const id = input.value;

        if (typeChange == "change-position") {
          const position = input.closest("tr").querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      })

      inputIds.value = ids.join(",");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một mục");
    }
  });
}
// End


// Restore multi
const formRestoreMulti = document.querySelector("[form-restore-multi]");
if (formRestoreMulti) {
  formRestoreMulti.addEventListener("submit", (e) => {
    e.preventDefault()
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

    const typeChange = e.target.elements.type.value;

    if (typeChange == "restore-all") {
      const isConfirm = confirm("bạn có chắc muốn khôi phục những sản phẩm này?");

      if (!isConfirm) {
        return;
      }
    }

    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formRestoreMulti.querySelector("input[name='ids']");

      inputChecked.forEach(input => {
        const id = input.value;
        ids.push(id);
      });

      inputIds.value = ids.join(",");
      formRestoreMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một mục");
    }
  });
}

// Show alert

const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
    setTimeout(() => {
      showAlert.remove();
    }, 500);
  }, time);
}

// Upload image
const uploadImage = document.querySelector('[upload-image]');
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  const clearButton = document.getElementById("clear-button");

  uploadImageInput.addEventListener("change", (e) => {
    clearButton.style.display = "inline";
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
    clearButton.addEventListener("click", () => {
      uploadImageInput.value = "";
      uploadImagePreview.src = "";
      clearButton.style.display = "none";
    });

  });
}
//End Upload image