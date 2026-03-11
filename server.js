const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/layout");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const mainRoutes = require("./routes/main");
app.use("/", mainRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});