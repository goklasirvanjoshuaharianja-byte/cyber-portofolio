const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { layout: "layouts/layout" });
});

router.get("/about", (req, res) => {
  res.render("about", { layout: "layouts/layout" });
});

router.get("/projects", (req, res) => {
  res.render("projects", { layout: "layouts/layout" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { layout: "layouts/layout" });
});

module.exports = router;
