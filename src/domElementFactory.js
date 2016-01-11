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

/**
 * @param page {Page}
 */
Factory.prototype.createPageElement = function (page) {
    if (null != page.element) {
        return page.element;
    }

    let content = `
        <li>
            <div class="page-zoom-overlay"></div>
            <a href="${page.imgPath}" class="page-large-img-anchor">
                <img src="${page.thumbPath}">
            </a>
        </li>
    `;
    let element = createElementFromHtml(content, this.document);

    page.element = element;
    element.organeModel = page;

    return element;
};

/**
 * @param folder {Folder}
 */
Factory.prototype.createPageListElement = function (folder) {
    if (null != folder.pageListElement) {
        return folder.pageListElement;
    }

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
 * @param folder {Folder}
 */
Factory.prototype.createFolderNameElement = function (folder) {
    if (null != folder.folderNameElement) {
        return folder.folderNameElement;
    }

    let content = `<h3 class="panel-title">${folder.name}</h3>`;
    let element = createElementFromHtml(content, this.document);
    folder.folderNameElement = element;

    return element;
};

Factory.prototype.createFolderPlaceholderNameElement = function () {
    let content = '<h3 class="panel-title">No folder selected</h3>';
    return createElementFromHtml(content, this.document);
};

Factory.prototype.createFolderPlaceholderPageListElement = function () {
    let content = '<p>Drop here one entry of folder list to open it.</p>';
    return createElementFromHtml(content, this.document);
};

/**
 * @param folder {Folder}
 */
Factory.prototype.createFolderEntryElement = function (folder) {
    if (null != folder.folderListEntryElement) {
        return folder.folderListEntryElement;
    }

    let content = `<li draggable="true" class="list-group-item">${folder.name}</li>`;
    let element = createElementFromHtml(content, this.document);

    folder.folderListEntryElement = element;
    element.organeModel = folder;

    return element;
};

Factory.prototype.createPageCounterElement = function () {
    let content = `<span class="badge">0</span>`;
    return createElementFromHtml(content, this.document);
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
