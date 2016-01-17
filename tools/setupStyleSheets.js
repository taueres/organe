'use strict';

const fs = require('fs');
const path = require('path');
const root = path.dirname(__dirname);

const createSymlink = function (destination, path) {
    try {
        fs.symlinkSync(destination, path);
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
};

createSymlink(
    path.join(root, 'node_modules/bootstrap/dist/css/bootstrap.min.css'),
    path.join(root, 'browser/vendor/bootstrap.min.css')
);

createSymlink(
    path.join(root, 'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'),
    path.join(root, 'browser/vendor/bootstrap-theme.min.css')
);

createSymlink(
    path.join(root, 'node_modules/magnific-popup/dist/magnific-popup.css'),
    path.join(root, 'browser/vendor/magnific-popup.css')
);
