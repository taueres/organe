'use strict';

let Folder = function Folder(id, name) {
    this.id = id;
    this.name = name;

    this.pageList = null;
    this.pageListElement = null;
    this.folderListEntryElement = null;
    this.folderNameElement = null;
    this.pageCounter = null;
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
