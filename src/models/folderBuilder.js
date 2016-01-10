'use strict';

let Folder = require('./folder');
let PageList = require('./pageList');

let FolderBuilder = function FolderBuilder(eventEmitter) {
    this.eventEmitter = eventEmitter;
};

FolderBuilder.prototype.newFolder = function (id, name) {
    let folder = new Folder(id, name);
    folder.pageList = new PageList(folder, this.eventEmitter);

    return folder;
};

module.exports = FolderBuilder;
