'use strict';

let FolderList = require('./models/folderList');
let Page = require('./models/page');

/**
 * @param folderBuilder {FolderBuilder}
 * @returns {FolderList}
 */
let getFolderList = function getFolderList(folderBuilder) {
    let mainFolder = folderBuilder.newFolder(1, 'Informativa privacy');
    let mainFirst = new Page(1, 'img/page1.png');
    let mainSecond = new Page(2, 'img/page2.png');
    mainFolder.addPage(mainFirst);
    mainFolder.addPage(mainSecond);

    let otherFolder = folderBuilder.newFolder(2, 'Modulo adesione');
    let otherFirst = new Page(11, 'img/page11.png');
    let otherSecond = new Page(12, 'img/page12.png');
    otherFolder.addPage(otherFirst);
    otherFolder.addPage(otherSecond);

    let thirdFolder = folderBuilder.newFolder(3, 'Attestato');
    let pageFirst = new Page(21, 'img/extra1.png');
    let pageSecond = new Page(22, 'img/extra2.png');
    thirdFolder.addPage(pageFirst);
    thirdFolder.addPage(pageSecond);

    let trash = folderBuilder.newFolder(4, 'Cestino');

    let folderList = new FolderList();
    folderList.addFolder(mainFolder);
    folderList.addFolder(otherFolder);
    folderList.addFolder(thirdFolder);
    folderList.addFolder(trash);

    return folderList;
};

module.exports.getFolderList = getFolderList;
