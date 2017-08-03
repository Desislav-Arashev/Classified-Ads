const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return res.render('contact');
        });
    app.use('/contact', router);
};

module.exports = { attachTo };
