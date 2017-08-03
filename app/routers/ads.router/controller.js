class LatestsAdsController {
    constructor() {
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
<<<<<<< HEAD

    create(req, res) {
        const bodyAd = req.body;
        bodyAd.avatar = req.file ? req.file.filename : 'no-image.png';
        bodyAd.date = new Date();
        this.data.ads.create(bodyAd)
            .then((dbUser) => {
                return res.redirect('/');
            })
            .catch((err) => {
                req.flash('error', err);
                Promise.reject();
            });
    }
=======
>>>>>>> parent of 4dad5df... post new ad
}

const init = (data) => {
    return new LatestsAdsController(data);
};

module.exports = { init };
