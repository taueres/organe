'use strict';

let PageList = require('./pageList');

let Folder = function Folder(id, name, pageList) {
    if (undefined === pageList) {
        pageList = new PageList(this);
    }

    this.id = id;
    this.name = name;
    this.pageList = pageList;

    this.pageListElement = null;
    this.folderListEntryElement = null;
};

Folder.prototype.getNumberOfPages = function getNumberOfPages() {
    return this.pageList.getNumberOfPages();
};

Folder.prototype.addPage = function (page, position) {
    this.pageList.addPage(page, position);
};

Folder.prototype.removePage = function (page) {
    this.pageList.removePage(page);
};

module.exports = Folder;
