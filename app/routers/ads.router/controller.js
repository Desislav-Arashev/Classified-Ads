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

        getAllByCategory(req, res) {
        const category = req.query.category || 1;
        const query = { link_category: category };
        const page = parseInt(req.query.page, 10) || 1;
        const pagesize = parseInt(req.query.size, 10) || 2;
        const orderBy = { date: -1 };
        const queries = {
            orderBy,
            query,
            pagesize,
            page,
        };

        return Promise.all([this.data.ads.getAllByQuery(queries),
        this.data.ads.getAllCount({ link_category: category })]
    )
            .then(([ads, adsCount]) => {
                const pages = Math.ceil(adsCount / pagesize);
                const searchQuery = {
                    category: category,
                    orderBy: 'date',
                };

                return res.status(200).render('all', {
                    ads: ads,
                    searchQuery: searchQuery,
                    page: page,
                    pages: pages,
                });
            });
    }

        homeGetAll(req, res) {
        this.data.ads.last(5)
            .then((ads) => {
                ads.forEach(function(ad) {
                    if (ad.title.length > 50) {
                        ad.title = ad.title.slice(0, 50);
                    }
                    if (ad.description.length > 400) {
                        ad.description = ad.description.slice(0, 400);
                    }
                }, this);
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
