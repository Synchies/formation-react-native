const express = require("express");

const app = express.Router();

app.use(express.json());

app.post("/connect", (req, res) => {
  const loginForm = req.body;
  const user = {
    displayName: loginForm.login,
  };

  if (loginForm.login !== "admin") {
    res.status(401).end();
  }

  req.session.user = user;

  res.json(user);
});

app.post("/disconnect", (req, res) => {
    req.session.user = undefined;
  res.status(204).end();
});

app.get("/is-connected", (req, res) => {
    if (!req.session.user) res.status(401).end();
    else res.json(req.session.user);
})

module.exports = app;
