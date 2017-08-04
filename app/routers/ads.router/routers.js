const { Router } = require('express');
const { upload } = require('../../../utils/uploadfiles');

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
        .get('/ad/:id', (req, res) => {
            return controller.getDetails(req, res);
        })
        .get('/all', (req, res) => {
            return controller.getAllByCategory(req, res);
        })
        .post('/postnewads', upload('./static/pictures/classified'),
            (req, res) => {
            return controller.create(req, res);
        });
    app.use('/', router);
};

module.exports = { attachTo };
