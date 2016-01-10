'use strict';

/**
 * Move the page to the specified folder
 * @param page {Page}
 * @param folder {Folder}
 * @param position {int}
 */
function movePageToFolder(page, folder, position) {
    let originalFolder = page.folder;
    if (null !== originalFolder) {
        originalFolder.removePage(page);
    }

    folder.addPage(page, position);
}

module.exports.movePageToFolder = movePageToFolder;
