const express = require("express");
const morgan = require("morgan");
const serveIndex = require("serve-index");
const session = require("express-session");
const { crudity } = require("crudity");
const { createServer } = require("http");

const api = require("./api");

const app = express();
const server = createServer(app);
const port = 3000;
const wwwDir = "./public";

app.use(morgan("tiny"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use((req, res, next) => setTimeout(next, 500));

app.use("/api/articles", crudity(server, "articles", { pageSize: 100 }));
app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
