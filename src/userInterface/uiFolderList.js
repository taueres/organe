'use strict';

let $ = require('jquery');

/**
 * @param $element {jQuery}
 * @param elementFactory {Factory}
 * @param eventEmitter {EventEmitter}
 * @constructor
 */
let UiFolderList = function UiFolderList($element, elementFactory, eventEmitter) {
    this.element = $element;
    this.elementFactory = elementFactory;

    eventEmitter.on('folder_activated', this.onFolderActivated.bind(this));
    eventEmitter.on('folder_deactivated', this.onFolderDeactivated.bind(this));
};

UiFolderList.prototype.render = function (folderList) {
    this.element.empty();
    let folderListElement = this.elementFactory.createFolderListElement(folderList);
    this.element.append(folderListElement);
};

/**
 * @param folder {Folder}
 */
UiFolderList.prototype.onFolderActivated = function (folder) {
    $(folder.folderListEntryElement).addClass('active');
};

/**
 * @param folder {Folder}
 */
UiFolderList.prototype.onFolderDeactivated = function (folder) {
    $(folder.folderListEntryElement).removeClass('active');
};

module.exports = UiFolderList;
