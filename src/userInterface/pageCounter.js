'use strict';

/**
 * @param folder {Folder}
 * @param element
 * @param eventEmitter {EventEmitter}
 * @constructor
 */
let PageCounter = function PageCounter(folder, element, eventEmitter) {
    this.folder = folder;
    this.element = element;

    eventEmitter.on('page_added_to_folder', this._onFolderChanged.bind(this));
    eventEmitter.on('page_removed_from_folder', this._onFolderChanged.bind(this));

    this.update();
};

/**
 * @param page {Page}
 * @param folder {Folder}
 * @private
 */
PageCounter.prototype._onFolderChanged = function (page, folder) {
    if (this.folder.id == folder.id) {
        this.update();
    }
};

PageCounter.prototype.update = function () {
    this.element.innerHTML = this.folder.getNumberOfPages();
};

module.exports = PageCounter;
