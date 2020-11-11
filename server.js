const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
const { port } = require("./configs");

const indexRouter = require("./routes/index");

const app = express();

app.set("view engine", "ejs");
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/", require("./routes/home.route"));
app.use("/current", require("./routes/current.route"));

app.listen(port, () => console.log(`App is running on port ${port}`));