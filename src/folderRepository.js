'use strict';

let FolderList = require('./models/folderList');
let Folder = require('./models/folder');
let Page = require('./models/page');

let getFolderList = function getFolderList() {
    let mainFolder = new Folder(1, 'Informativa privacy');
    let mainFirst = new Page(1, 'img/page1.png');
    let mainSecond = new Page(2, 'img/page2.png');
    mainFolder.addPage(mainFirst);
    mainFolder.addPage(mainSecond);

    let otherFolder = new Folder(2, 'Modulo adesione');
    let otherFirst = new Page(11, 'img/page11.png');
    let otherSecond = new Page(12, 'img/page12.png');
    otherFolder.addPage(otherFirst);
    otherFolder.addPage(otherSecond);

    let folderList = new FolderList();
    folderList.addFolder(mainFolder);
    folderList.addFolder(otherFolder);

    return folderList;
};

module.exports.getFolderList = getFolderList;
