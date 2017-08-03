const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('/chat', (req, res) => {
            return res.render('chat');
        });

    app.use('/', router);
};

module.exports = { attachTo };
