'use strict';

let domElementFactory = require('./domElementFactory');
let folderRepository = require('./folderRepository');
let ActiveFolderCollection = require('./browser/activeFolderCollection');
let UiFolderList = require('./browser/uiFolderList');
let pageMover = require('./pageMover');
let EventEmitter = require('events');

let Organe = function Organe($appElement, document) {
    this.eventEmitter = new EventEmitter();

    this.domElemFactory = new domElementFactory(document);

    this.uiFolderList = new UiFolderList(
        $appElement.find('.folder-list'),
        this.domElemFactory
    );

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
    this.activeFolderCollection.init();

    this.folderList = folderRepository.getFolderList();
    this.uiFolderList.render(this.folderList);
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
    console.log(event);
    let page = event.item.organeModel;
    let fromFolder = event.from.organeModel;
    let toFolder = event.to.organeModel;
    let fromPosition = event.oldIndex;
    let toPosition = event.newIndex;

    if (fromFolder.id !== toFolder.id) {
        pageMover.movePageToFolder(page, toFolder, toPosition);
    } else if (fromPosition !== toPosition && page.folder.id === toFolder.id) {
        pageMover.sortPageInFolder(page, event.newIndex);
    }
};

module.exports = Organe;
