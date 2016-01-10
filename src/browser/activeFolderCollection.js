'use strict';

let ActiveFolder = require('./activeFolder');

let ActiveFolderCollection = function ActiveFolderCollection(elements, domElementFactory, eventEmitter) {
    this.activeFolders = [];

    elements.forEach(elem => {
        let folder = new ActiveFolder(elem, domElementFactory, eventEmitter);
        this.activeFolders.push(folder);
    });
};

ActiveFolderCollection.prototype.init = function () {
    this.activeFolders.forEach(function (folder) {
        folder.empty();
    });
};

ActiveFolderCollection.prototype.isFolderActiveById = function (folderId) {
    return this.activeFolders.reduce(function (previous, currentFolder) {
        if (previous) {
            return previous;
        }

        return currentFolder.folder && currentFolder.folder.id == folderId;
    }, false);
};

module.exports = ActiveFolderCollection;
