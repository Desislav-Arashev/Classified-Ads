const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/', (req, res) => {
            return res.render('latestads');
        });
    app.use('/latestads', router);
};

module.exports = { attachTo };
