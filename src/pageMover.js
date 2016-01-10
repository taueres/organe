'use strict';

/**
 * Move the page to the specified folder
 * @param page {Page}
 * @param folder {Folder}
 * @param position {int}
 */
function movePageToFolder(page, folder, position) {
    console.log(`Moving page ${page.id} to folder ${folder.name}`);
    let originalFolder = page.folder;
    if (null !== originalFolder) {
        originalFolder.removePage(page);
    }

    folder.addPage(page, position);
}

/**
 * @param page {Page}
 * @param newPosition {int}
 */
function sortPageInFolder(page, newPosition) {
    console.log(`Sorting page ${page.id} to new position ${newPosition}`);
    let folder = page.folder;
    folder.pageList.sortPage(page, newPosition);
}

module.exports.movePageToFolder = movePageToFolder;
module.exports.sortPageInFolder = sortPageInFolder;
