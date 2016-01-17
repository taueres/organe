'use strict';

let Sortable = require('sortablejs');

/**
 * @param $folderElement {jQuery}
 * @param domElementFactory {Factory}
 * @param eventEmitter {EventEmitter}
 * @constructor
 */
let ActiveFolder = function ActiveFolder($folderElement, domElementFactory, eventEmitter) {
    this.elementFactory = domElementFactory;
    this.eventEmitter = eventEmitter;

    // Contains the folder model currently active
    this.folder = null;

    this.folderName = $folderElement.find('.folder-name');
    this.pageList = $folderElement.find('.page-list');

    $folderElement.on('dragenter dragover', function (event) {
        event.preventDefault();
    });

    $folderElement.on('drop', event => {
        event.activeFolder = this;
        eventEmitter.emit('element_dropped_on_active_folder', event);
    });
};

/**
 * @param folder {Folder}
 */
ActiveFolder.prototype.activateFolder = function (folder) {
    let previousFolder = this.folder;
    this.folder = folder;

    this.pageList.empty();
    let pageList = this.elementFactory.createPageListElement(folder);
    this.pageList.append(pageList);

    this.folderName.empty();
    let folderName = this.elementFactory.createFolderNameElement(folder);
    this.folderName.append(folderName);

    Sortable.create(pageList, {
        group: 'pages',
        animation: 150,
        onSort: (event) => {
            this.eventEmitter.emit('page_dropped', event);
        }
    });

    this.eventEmitter.emit('folder_activated', folder);
    if (null != previousFolder) {
        this.eventEmitter.emit('folder_deactivated', previousFolder);
    }
};

ActiveFolder.prototype.empty = function () {
    this.folder = null;

    this.pageList.empty();
    let pageList = this.elementFactory.createFolderPlaceholderPageListElement();
    this.pageList.append(pageList);

    this.folderName.empty();
    let folderName = this.elementFactory.createFolderPlaceholderNameElement();
    this.folderName.append(folderName);
};

module.exports = ActiveFolder;
