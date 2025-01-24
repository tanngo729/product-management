module.exports.createPost = (req, res, next) => {
  if (!req.body.name) {
    req.flash("error", "Vui lòng nhập tên tiêu đề");
    res.redirect("back");
    return;
  }

  next();
}