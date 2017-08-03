const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/latestads', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/postnewads', (req, res) => {
            return res.render('postnewads');
        })
        .post('/postnewads', (req, res) => {
            return controller.create(req, res);
        });
    app.use('/', router);
};

module.exports = { attachTo };
