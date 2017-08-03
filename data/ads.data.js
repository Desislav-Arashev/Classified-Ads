
const BaseData = require('./base/base.data');

const Todo = require('../models/ads.model');

class AdsData extends BaseData {
    constructor(db) {
        super(db, Todo, Todo);
    }

    filterByIsDone(isDone) {
        return this.filterBy({ isDone });
    }
}

module.exports = AdsData;

