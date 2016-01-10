'use strict';

let FolderList = function FolderList() {
    this.folders = [];
};

FolderList.prototype.addFolder = function addFolder(folder) {
    this.folders.push(folder);
};

FolderList.prototype.forEach = function forEach(fn) {
    this.folders.forEach(fn);
};

FolderList.prototype.getFolderById = function (folderId) {
    return this.folders.reduce(function (previous, current) {
        if (previous !== undefined) {
            return previous;
        }

        if (current.id == folderId) {
            return current;
        }
    }, undefined);
};

module.exports = FolderList;
