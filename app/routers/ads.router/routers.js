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
<<<<<<< HEAD
        })
        .post('/postnewads', upload('./static/pictures/classified'), (req, res) => {
            return controller.create(req, res);
=======
>>>>>>> parent of 4dad5df... post new ad
        });
    app.use('/', router);
};

module.exports = { attachTo };
