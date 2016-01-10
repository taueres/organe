'use strict';

let Factory = function Factory(document) {
    if ( ! (this instanceof Factory)) {
        return new Factory(document);
    }

    this.document = document;
};

let createElementFromHtml = function (html, document) {
    let wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    return wrapper.firstElementChild;
};

Factory.prototype.createPageElement = function (page) {
    let content = `<li>Page ${page.id}</li>`;
    let element = createElementFromHtml(content, this.document);

    page.element = element;
    element.organeModel = page;

    return element;
};

/**
 * @param folder {Folder}
 */
Factory.prototype.createPageListElement = function (folder) {
    let content = '<ol></ol>';
    let pageListElement = createElementFromHtml(content, this.document);

    folder.pageListElement = pageListElement;
    pageListElement.organeModel = folder;

    folder.pageList.forEach(page => {
        let pageElement = this.createPageElement(page);
        pageListElement.appendChild(pageElement);
    });

    return pageListElement;
};

/**
 * @param folderName {string}
 */
Factory.prototype.createFolderNameElement = function (folderName) {
    let content = `<h3 class="panel-title">${folderName}</h3>`;
    return createElementFromHtml(content, this.document);
};

/**
 * @param folder {Folder}
 */
Factory.prototype.createFolderEntryElement = function (folder) {
    let content = `<li draggable="true" class="list-group-item">${folder.name}</li>`;
    let element = createElementFromHtml(content, this.document);

    folder.folderListEntryElement = element;
    element.organeModel = folder;

    return element;
};

/**
 * @param folderList {FolderList}
 */
Factory.prototype.createFolderListElement = function (folderList) {
    let content = '<ol class="list-group"></ol>';
    let folderListElement = createElementFromHtml(content, this.document);

    folderList.forEach(folder => {
        let folderLabelElement = this.createFolderEntryElement(folder);
        folderLabelElement.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('folderId', folder.id);
            event.dataTransfer.effectAllowed = 'copy';
        });
        folderListElement.appendChild(folderLabelElement);
    });

    return folderListElement;
};

module.exports = Factory;
