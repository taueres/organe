'use strict';

let FolderList = require('./models/folderList');
let Page = require('./models/page');

/**
 * @param folderBuilder {FolderBuilder}
 * @returns {FolderList}
 */
let getFolderList = function getFolderList(folderBuilder) {
    let mainFolder = folderBuilder.newFolder(1, 'Informativa privacy');
    for (let i = 1; i <= 3; i++) {
        let page = new Page(i, `img/small/${i}.png`, `img/large/${i}.png`);
        mainFolder.addPage(page);
    }

    let otherFolder = folderBuilder.newFolder(2, 'Modulo adesione');
    for (let i = 4; i <= 6; i++) {
        let page = new Page(i, `img/small/${i}.png`, `img/large/${i}.png`);
        otherFolder.addPage(page);
    }

    let thirdFolder = folderBuilder.newFolder(3, 'Attestato');
    for (let i = 7; i <= 10; i++) {
        let page = new Page(i, `img/small/${i}.png`, `img/large/${i}.png`);
        thirdFolder.addPage(page);
    }

    let trash = folderBuilder.newFolder(4, 'Cestino');

    let folderList = new FolderList();
    folderList.addFolder(mainFolder);
    folderList.addFolder(otherFolder);
    folderList.addFolder(thirdFolder);
    folderList.addFolder(trash);

    return folderList;
};

module.exports.getFolderList = getFolderList;
