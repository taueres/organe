'use strict';

let PageCounter = require('./pageCounter');

/**
 * @param elementFactory {Factory}
 * @param eventEmitter {EventEmitter}
 * @constructor
 */
let PageCounterBuilder = function PageCounterBuilder(elementFactory, eventEmitter) {
    this.elementFactory = elementFactory;
    this.eventEmitter = eventEmitter;
};

/**
 * @param folderList {FolderList}
 */
PageCounterBuilder.prototype.addCountersToFolderList = function (folderList) {
    folderList.forEach(folder => {
        this.addCounterToFolder(folder);
    });
};

/**
 * @param folder {Folder}
 */
PageCounterBuilder.prototype.addCounterToFolder = function (folder) {
    let folderEntryElement = folder.folderListEntryElement;
    let counterElement = this.elementFactory.createPageCounterElement();
    folderEntryElement.appendChild(counterElement);

    folder.pageCounter = new PageCounter(folder, counterElement, this.eventEmitter);
};

module.exports = PageCounterBuilder;
