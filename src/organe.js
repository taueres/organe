'use strict';

let domElementFactory = require('./domElementFactory');
let folderRepository = require('./folderRepository');
let ActiveFolderCollection = require('./browser/activeFolderCollection');
let pageMover = require('./pageMover');
let EventEmitter = require('events');

let Organe = function Organ($appElement, document) {
    this.eventEmitter = new EventEmitter();

    this.domElemFactory = new domElementFactory(document);
    this.folderListElement = $appElement.find('.folder-list');

    let activeFolderElements = [
        $appElement.find('.first-folder'),
        $appElement.find('.second-folder')
    ];

    this.activeFolderCollection = new ActiveFolderCollection(
        activeFolderElements,
        this.domElemFactory,
        this.eventEmitter
    );

    this.eventEmitter.on('element_dropped_on_active_folder', event => {
        let folderId = event.originalEvent.dataTransfer.getData('folderId');
        if (folderId !== '') {
            this._onFolderDroppedToBecomeActive(folderId, event.activeFolder);
        }
    });

    this.eventEmitter.on('page_dropped', this._onPageDropped.bind(this));
};

Organe.prototype.start = function () {
    this.folderList = folderRepository.getFolderList();

    this.activeFolderCollection.init();

    this.folderListElement.empty();
    let folderListElement = this.domElemFactory.createFolderListElement(this.folderList);
    this.folderListElement.append(folderListElement);
};

/**
 * @param folderId {string}
 * @param activeFolder {ActiveFolder}
 * @private
 */
Organe.prototype._onFolderDroppedToBecomeActive = function (folderId, activeFolder) {
    let folder = this.folderList.getFolderById(folderId);
    if ( ! this.activeFolderCollection.isFolderActiveById(folderId)) {
        activeFolder.activateFolder(folder);
    }
};

Organe.prototype._onPageDropped = function (event) {
    let page = event.item.organeModel;
    let destFolder = event.to.organeModel;
    let position = event.newIndex;

    pageMover.movePageToFolder(page, destFolder, position);
};

module.exports = Organe;
