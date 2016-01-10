'use strict';

let UiFolderList = function UiFolderList($element, elementFactory) {
    this.element = $element;
    this.elementFactory = elementFactory;
};

UiFolderList.prototype.render = function (folderList) {
    this.element.empty();
    let folderListElement = this.elementFactory.createFolderListElement(folderList);
    this.element.append(folderListElement);
};

module.exports = UiFolderList;
