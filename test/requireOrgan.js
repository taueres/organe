'use strict';

const path = require('path');
const basePath = '../src';

let requireOrgane = function (requestedPath) {
    return require(path.join(basePath, requestedPath));
};

module.exports = requireOrgane;
