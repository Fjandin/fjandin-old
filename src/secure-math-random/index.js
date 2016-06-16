'use strict';

const getRandomValues = require('get-random-values');

module.exports = function mathRandom() {
    const result = getRandomValues(new Uint8Array(1));
    return result[0] / 256;
};
