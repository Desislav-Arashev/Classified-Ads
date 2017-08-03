class LatestsAdsController {
    constructor() {
    }

    getAll(req, res) {
        return res.render('latestads');
    }
}

const init = (data) => {
    return new LatestsAdsController(data);
};

module.exports = { init };
