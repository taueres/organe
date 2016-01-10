'use strict';

let nullEventEmitter = {
    on: function () {},
    once: function () {},
    emit: function () {},
    off: function () {}
};

module.exports = nullEventEmitter;
