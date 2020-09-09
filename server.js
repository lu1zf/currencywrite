const express = require("express");
const nunjucks = require("nunjucks");
const extenso = require("extenso");
const path = require("path");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true,
});

app.set("view engine", ".njk");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/result", (req, res) => {
  const { value } = req.query;

  //tira os espaços da string
  const amount = value.replace(/\s+/g, "");
  const currencyString = extenso(amount, { mode: "currency" });

  return res.render("result", { currencyString });
});

app.listen(3000);
