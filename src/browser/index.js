'use strict';

let $ = require('jquery');
let Organe = require('../organe');

$(document).ready(
    function () {
        let $wrapper = $('#organe-wrapper');
        let app = new Organe($wrapper, document);
        app.start();
    }
);
