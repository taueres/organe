'use strict';

let ElementFactory = require('./domElementFactory');
let folderRepository = require('./folderRepository');
let FolderBuilder = require('./models/folderBuilder');
let ActiveFolderCollection = require('./userInterface/activeFolderCollection');
let UiFolderList = require('./userInterface/uiFolderList');
let PageCounterBuilder = require('./userInterface/pageCounterBuilder');
let pageMover = require('./pageMover');
let EventEmitter = require('events');

let Organe = function Organe($appElement, document) {
    this.eventEmitter = new EventEmitter();
    this.domElemFactory = new ElementFactory(document);
    this.pageCounterBuilder = new PageCounterBuilder(this.domElemFactory, this.eventEmitter);
    this.folderBuilder = new FolderBuilder(this.eventEmitter);

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
};

Organe.prototype.start = function () {
    this.activeFolderCollection.init();

    this.folderList = folderRepository.getFolderList(this.folderBuilder);
    this.uiFolderList.render(this.folderList);

    this.pageCounterBuilder.addCountersToFolderList(this.folderList);

    this._listenEvents();
};

Organe.prototype._listenEvents = function () {
    this.eventEmitter.on('element_dropped_on_active_folder', event => {
        let folderId = event.originalEvent.dataTransfer.getData('folderId');
        if (folderId !== '') {
            this._onFolderDroppedToBecomeActive(folderId, event.activeFolder);
        }
    });

    this.eventEmitter.on('page_dropped', this._onPageDropped.bind(this));
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
