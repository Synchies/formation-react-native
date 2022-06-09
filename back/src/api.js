const express = require('express');

const app = express.Router();

app.use(express.json());

app.post('/connect', (req, res) => {
    const loginForm = req.body;
    const user = {
        displayName: loginForm.login
    }

    if (loginForm.login !== "admin") {
        res.status(401).end();
    }

    res.json(user);
});

module.exports = app;