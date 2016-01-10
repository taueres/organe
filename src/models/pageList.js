'use strict';

let nullEventEmitter = require('../events/nullEventEmitter');

let PageList = function PageList(folder, eventEmitter) {
    if (undefined === eventEmitter) {
        eventEmitter = nullEventEmitter;
    }

    this.folder = folder;
    this.pages = [];
    this.eventEmitter = eventEmitter;
};

PageList.prototype.getNumberOfPages = function getNumberOfPages() {
    return this.pages.length;
};

PageList.prototype.addPage = function addPage(page, insertPos) {
    if (undefined === insertPos) {
        insertPos = this.pages.length - 1;
    }

    page.folder = this.folder;
    this.pages.splice(insertPos, 0, page);

    this.eventEmitter.emit('page_added_to_folder', page, this.folder, insertPos);
};

PageList.prototype.removePage = function removePage(page) {
    let index = this.pages.indexOf(page);
    this.pages.splice(index, 1);
    page.folder = null;

    this.eventEmitter.emit('page_removed_from_folder', page, this.folder);
};

PageList.prototype.forEach = function forEach(fn) {
    this.pages.forEach(fn);
};

PageList.prototype.sortPage = function sortPage(page, newPosition) {
    let index = this.pages.indexOf(page);
    this.pages.splice(index, 1);
    this.pages.splice(newPosition, 0, page);
};

module.exports = PageList;
