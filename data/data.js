const UsersData = require('./users.data');
const AdsData = require('./ads.data');

const init = (db) => {
    return Promise.resolve({
    users: new UsersData(db),
    ads: new AdsData(db),
    });
};

module.exports = { init };
