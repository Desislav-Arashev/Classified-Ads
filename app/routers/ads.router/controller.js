class LatestsAdsController {
    constructor(data) {
        this.data = data;
    }

    getAll(req, res) {
        this.data.ads.last(10)
            .then((ads) => {
                ads.forEach(function(ad) {
                    ad.date = ad.date.toLocaleDateString('en-US');
                }, this);
                return res.render('latestads', {
                    ads: ads,
                });
            });
    }

        homeGetAll(req, res) {
        this.data.ads.last(5)
            .then((ads) => {
                const active = ads[0];
                ads.splice(ads, 1);
                const inactive = ads;
                return res.render('home', {
                    ads: inactive,
                    active: active,
                });
            });
    }

    getDetails(req, res) {
        return this.data.ads.findById(req.params.id)
            .then((ad) => {
                if (!ad) {
                    return res.redirect(404, '/latestads');
                }
                ad.date = ad.date.toLocaleDateString('en-US');

                return res.render('details', {
                    ad: ad,
                    user: req.user,
                });
            })
            .catch((err) => {
                return res.redirect(404, '/sells');
            });
    }

    create(req, res) {
        const bodyAd = req.body;
        bodyAd.avatar = req.file ? req.file.filename : 'no-image.png';
        bodyAd.date = new Date();
        bodyAd.user = req.user;
        this.data.ads.create(bodyAd)
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
