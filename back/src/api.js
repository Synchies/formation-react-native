const multer = require('multer');
const fs = require('fs');
const express = require("express");

const uploadDir = './public';
fs.mkdirSync(uploadDir, {recursive: true});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log('file: ', file);
    cb(null, file.originalname);
  },
});

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
});

app.post('/upload', multer({storage}).single('file'), (req, res) => {
  console.log('req.body: ', req.body);
  console.log('req.file: ', req.file);
  console.log('req.baseUrl: ', req.baseUrl);
  res.status(201).json({url: req.baseUrl + '/' + req.file?.filename});
});

module.exports = app;
