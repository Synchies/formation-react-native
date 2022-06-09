const express = require("express");
const morgan = require("morgan");
const serveIndex = require("serve-index");
const api = require('./api');

const app = express();
const port = 3000;
const wwwDir = "../public";

app.use(morgan("tiny"));

app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
