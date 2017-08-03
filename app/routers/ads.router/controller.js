class LatestsAdsController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        return res.render('latestads');
    }

    create(req, res) {
        const bodyUser = req.body;
        console.log(req.body);
        return this.data.ads.create(bodyUser)
            .then((dbUser) => {
                return res.redirect('/');
            })
            .catch((err) => {
                req.flash('error', err);
                Promise.reject();
            });
    }
}

const init = (data) => {
    return new LatestsAdsController(data);
};

module.exports = { init };
